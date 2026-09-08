# MMZ 多 Zone 用法（7206）

MMZ（Media Memory Zone，媒体内存池）是给媒体子系统（VI/VPSS/VENC/REGION 等）预留的一段物理内存。默认整个媒体内存是一个名为 `anonymous` 的 Zone；当多种业务的 DDR 需求差异很大、或想隔离不同模块的内存时，可以把它拆成**多个 Zone 池**，按名称分别申请。

本文以 GK7206（XM7206V11A / V12A）为例整理配置步骤。

> 关键结论：多 Zone 的语法是 `mmz=name,gfp,start,size`，**用冒号 `:` 分隔多个 Zone**，整体作为内核命令行 `mmz=` 参数（或模块参数）传入。驱动解析源码见 `source/gmp/drv/osal/linux/kernel/mmz/allocator.c::__allocator_init()`。

---

## 1. 参数格式

```text
mmz=zone1_name,gfp,start,size:zone2_name,gfp,start,size:...
```

每个 Zone 4 个字段：

| 字段 | 含义 | 示例 |
|------|------|------|
| name | Zone 名称，申请内存时按名定位 | `anonymous` / `venc_pool` |
| gfp | GFP 标志，普通 DDR 填 `0` | `0` |
| start | Zone 起始物理地址（16 进制） | `0x42000000` |
| size | Zone 大小（16 进制地址或 MB/tracking 后缀） | `64M` / `0x4000000` |

说明：

- 每个 Zone 必须填满 4 个字段，否则驱动报 `error parameters` 并返回 `-EINVAL`。
- Zone 之间**物理地址不能重叠**，也不能与内核内存 `mem=` 段冲突，否则驱动打 `ERROR: Conflict MMZ`。
- 驱动用 `strsep(&s, ":")` 切分 Zone、`strsep(&line, ",")` 切分字段，所以 Zone 名和地址里**不能出现 `:` `,`**。
- 整个 `mmz=` 参数长度上限 `MMZ_SETUP_CMDLINE_LEN = 256` 字节。

---

## 2. 计算方法（地址规划）

媒体工具链加载脚本 `load`（`source/gmp/ko/linux-<ver>/<gcc>/.../load`）里的默认划分（以 V11A 128MB 为例）：

```text
# DDR start:0x40000000, kernel start:0x40000000,  OS(32M); MMZ start:0x42000000
mem_total=128                # 总内存
mem_start=0x40000000         # 物理内存起点
os_mem_size=32               # OS(内核) 32M，结束于 0x42000000
mmz_start=0x42000000;        # MMZ 起点
mmz_size=96;                 # MMZ 96M，结束于 0x48000000
```

因此 128MB 内存的地图是：

```text
0x40000000 ┌─────────────┐
           │  OS/kernel  │  32M  (mem=32M)
0x42000000 ├─────────────┤
           │  MMZ 池      │  96M  (mmz=...)
0x48000000 └─────────────┘   = 128M 上限
```

V12A（256MB）则 `os_mem_size=32`、`mmz_size=224`，MMZ 结束于 `0x50000000`。

多 Zone 就是把 MMZ 这一段物理区间切成若干段。例如 128MB 板卡拆成一个 64M 主池 + 一个 32M 编码池：

```text
0x42000000 ┌──────────────┐
           │ anonymous 64M│  (0x42000000, 64M → 0x46000000)
0x46000000 ├──────────────┤
           │ venc_pool 32M│  (0x46000000, 32M → 0x48000000)
0x48000000 └──────────────┘
```

---

## 3. 配置入口有两种

MMZ 参数既可以通过内核命令行传入，也可以通过模块参数传入，驱动会优先使用内核命令行里 `mmz=` 的值。

### 方式 A：通过内核命令行（bootargs）

在 `sdk/configs/xm7206v11a/prebuilts/spi_bootargs_*.txt`（或对应 nand/emmc 文件）里修改 bootargs 的 `mmz=` 段。

单 Zone（默认）：

```text
mem=32M ... mmz_allocator=xmedia mmz=anonymous,0,0x42000000,96M ...
```

多 Zone：

```text
mem=32M ... mmz_allocator=xmedia mmz=anonymous,0,0x42000000,64M:venc_pool,0,0x46000000,32M ...
```

### 方式 B：通过加载脚本（insmod 模块参数）

媒体驱动以模块方式加载时，在 `load` 脚本的 `insert_ko()` 里修改 `insmod xm_osal.ko` 的 `mmz=` 参数：

```bash
insmod xm_osal.ko mmz_allocator=xmedia \
       mmz=anonymous,0,0x42000000,64M:venc_pool,0,0x46000000,32M || report_error
```

> 脚本里默认是 `mmz=anonymous,0,$mmz_start,$mmz_size`，变量由 `pre_mem_info()` 按芯片型号设置。手动改多 Zone 时直接写死地址即可，注意不要越过 `mem_total` 上限。

---

## 4. 按 Zone 名称申请内存

默认行为：不带名称申请时，`xmedia_mmz_alloc` 会落到名为 `anonymous` 的 Zone（见 `osal_mmz.h` 的 `begin_list_for_each_mmz` 宏，名称未指定时按 `anonymous` 匹配）。

带名称申请（从指定 Zone 分配）：

```c
#include "xmedia_mmz.h"

/* 从 venc_pool 这个 Zone 申请 1MB */
xmedia_u64 phy = xmedia_mmz_alloc("venc_pool", "venc_frm", 1024 * 1024);
if (phy == 0) {
    printf("alloc from venc_pool failed\n");
    return -1;
}

/* 释放 */
xmedia_s32 ret = xmedia_mmz_free(phy);
```

API：

- `xmedia_mmz_alloc(mmz_name, buf_name, size)` — 按 Zone 名申请，第二个参数 `mmz_name` 传 Zone 名
- `xmedia_mmz_free(phy_addr)` — 释放
- `xmedia_mmz_map(phy_addr, size, cached)` — 映射
- `xmedia_mmz_unmap(virt_addr)` — 解除映射

---

## 5. 验证结果

加载后查看媒体内存使用情况：

```bash
cat /proc/media-mem
```

多 Zone 时输出形如：

```text
+---ZONE: PHYS(0x42000000, 0x45FFFFFF), GFP=0, nBYTES=65536KB, NAME="anonymous"
+---ZONE: PHYS(0x46000000, 0x47FFFFFF), GFP=0, nBYTES=32768KB, NAME="venc_pool"

---MMZ_USE_INFO:
 total size=98304KB(96MB), used=...KB(...), free=...KB(...), zone_number=2, block_number=...
```

`zone_number=N` 即确认有 N 个 Zone 生效。

---

## 6. 注意事项 / 常见坑

- **Zone 名必须唯一**，`anonymous` 是默认池，建议保留它作为主池，其余按业务命名。
- **地址段不能重叠**，也不能与 `mem=`（OS 内存）重叠；冲突时驱动打印 `ERROR: Conflict MMZ` 并拒绝注册该 Zone。
- 修改之前先确认芯片型号对应的内存上限（V11A 128M、V12A 256M），`mmz_size` 别配到越界，否则启动可能异常。
- `mmz=` 只有 256 字节上限，Zone 数量太多或名称太长会被截断。
- 媒体驱动以 `.ko` 形式加载时，模块参数与内核命令行的 `mmz=` 都会生效，命令行的优先级更高 —— 改了 bootargs 后注意别被 `load` 脚本覆盖。

---

## 7. xcam 应用层创建多 Zone 的用法

上面第 3 节是**内核/驱动层**切 Zone（bootargs 或 insmod），`/proc/media-mem` 里能看到多个 ZONE。实际业务要真正把内存分配到指定 Zone，需要在 xcam 应用层做两件事：

1. 用 `xmedia_vb_create_pool()` 创建**挂在指定 MMZ Zone 上的 VB 私有池**；
2. 用 `xmedia_sys_set_mem_config()` 把某个模块通道（如 VENC 通道）**绑定到指定 Zone**。

下面参考 XM7206 xcam 源码（`xcam/source/media/src/component/xmorca/sys/media_sys.c`）。

### 7.1 在指定 Zone 上创建 VB 私有池

`xmedia_vb_create_pool()` 的参数结构 `xmedia_vb_pool_config` 里有一个 `mmz_name` 字段，填 Zone 名称即可让该 VB 池从对应 MMZ Zone 申请内存。`media_sys_vb_create_pool()` 的典型写法：

```c
xmedia_s32 media_sys_vb_create_pool(const xcam_media_vb_config *vb_config, xmedia_u32 *pool_id)
{
    xmedia_vb_base_info base_info = {0};
    xmedia_vb_cal_cfg vb_cal_cfg = {0};
    xmedia_vb_pool_config pool_config = {0};

    base_info.width   = vb_config->width;
    base_info.height  = vb_config->height;
    base_info.align   = MEDIA_SYS_BUF_DEFAULT_ALIGN;
    base_info.video_fmt = XMEDIA_VIDEO_FMT_LINEAR;
    // ... 设置 pixel_fmt 等

    /* 根据图像格式算出单块 buffer 大小 */
    xmedia_vb_get_buffer_config(&base_info, &vb_cal_cfg);

    pool_config.block_size = vb_cal_cfg.vb_size;
    pool_config.block_cnt  = vb_config->block_cnt;
    pool_config.map_mode   = XMEDIA_VB_MAP_MODE_NONE;
    /* mmz_name 留空 = 从默认 anonymous Zone 申请 */

    *pool_id = xmedia_vb_create_pool(&pool_config);
    if (VB_INVALID_POOLID == *pool_id) {
        MEDIA_ERR("xmedia vb create pool failed, try next zone\n");
        /* 主池失败后，回退到专用 Zone uzone0 再建一次 */
        strncpy(pool_config.mmz_name, "uzone0", sizeof(pool_config.mmz_name) - 1);
        *pool_id = xmedia_vb_create_pool(&pool_config);
        if (VB_INVALID_POOLID == *pool_id) {
            MEDIA_ERR("xmedia vb create pool failed!\n");
            return XMEDIA_FAILURE;
        }
    }
    return XMEDIA_SUCCESS;
}
```

要点：

- `pool_config.mmz_name` **不填（空字符串）**时，VB 池从默认 `anonymous` Zone 分配；
- 填了 Zone 名（如 `"uzone0"`）就从该 Zone 分配 —— 所以先要保证 bootargs/insmod 里真的用冒号定义了 `uzone0` 这个 Zone，否则创建依然失败；
- `xmedia_vb_pool_config` 定义在 `xmedia_vb.h`：

```c
typedef struct {
    xmedia_u32 block_size;                       /* 单块大小(字节) */
    xmedia_u32 block_cnt;                        /* 块数            */
    xmedia_vb_map_mode map_mode;                 /* 映射模式         */
    xmedia_char mmz_name[MAX_MMZ_NAME_LEN];      /* MMZ Zone 名      */
} xmedia_vb_pool_config;
```

### 7.2 把模块通道绑定到指定 Zone

除了建池时指定 Zone，还可以在 `media_sys_init()` 里对某个模块通道单独绑定 Zone。xcam 示例（VENC 通道 0 绑到 `uzone0`）：

```c
/* media_sys_init() 中，vb/sys 初始化之后 */
xmedia_chn_info chn_info[] = {
    { MOD_ID_VENC, 0, 0 }            /* VENC 设备0 通道0 */
};

for (xmedia_s32 i = 0; i < sizeof(chn_info) / sizeof(xmedia_chn_info); i++) {
    ret = xmedia_sys_set_mem_config(&chn_info[i], "uzone0");
    if (XMEDIA_SUCCESS != ret) {
        MEDIA_ERR("media sys set mem config failed\n");
        return XMEDIA_FAILURE;
    }
}
```

对应接口（见 `xmedia_sys.h`）：

```c
/* 设置某模块通道使用的 MMZ Zone */
xmedia_s32 xmedia_sys_set_mem_config(const xmedia_chn_info *chn_info, const xmedia_char *mmz_name);

/* 反查某模块通道当前使用的 Zone */
xmedia_s32 xmedia_sys_get_mem_config(const xmedia_chn_info *chn_info, xmedia_char *mmz_name);
```

`xmedia_chn_info` 用 `MOD_ID_xxx / dev_id / chn_id` 唯一标识一条通道，`MOD_ID_VENC`、`MOD_ID_VPSS` 等见 `defines.h`。

### 7.3 配套的 bootargs（Zone 定义）

要让上面的 `uzone0` 生效，bootargs 必须同时定义 `anonymous` 和 `uzone0` 两个 Zone，例如（128M 板卡）：

```text
... mem=32M ... mmz_allocator=xmedia \
mmz=anonymous,0,0x42000000,64M:uzone0,0,0x46000000,32M ...
```

这样 `anonymous` 作主池（VI/VPSS 等默认分配），`uzone0` 作为 VENC 的专用池。`media_sys_vb_create_pool` 先试主池、失败再退回 `uzone0` 的写法，正是为了在这种"主池不够、退回专用池"的场景下兜底。

> 注意：7.1/7.2 这两段 `#if 1 // ONEED modify` / `uzone0` 调用是客户工程里后加的定制代码，不是 XMedia SDK 默认行为。做多 Zone 方案时建议保留 `anonymous` 主池、把专用 Zone 按业务（VENC/NPU/VO）命名，并在 `media_sys_init` 里逐个通道 `set_mem_config`，便于后续按 `/proc/media-mem` 核对每个 Zone 占用。
