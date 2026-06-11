# scan 移植笔记

## 1. 编译前准备

### 1.1 代码路径

scan 代码放置路径如下：

```sh
|- XMediaIPCLinuxV100R002C00SPC050
|- test
   |- scan
```

### 1.2 Makefile 中修改 sdk 路径

修改 scan/Makefile 中 sdk 的路径为你的 sdk 路径

`SDK_DIR := $(shell cd ../../sdk && /bin/pwd)` => <br>
`SDK_DIR := $(shell cd ../../XMediaIPCLinuxV100R002C00SPC050 && /bin/pwd)`

根据 sensor 的实际参数，修改 scan/scan.c 中 scan_init()

### 1.3 scan 驱动输出路径

在 scan 目录下 make，编译出 xm_scan.ko，输出路径位于 `sdk/out/xm***/ko` 中

<br>

## 2. 移植 sensor 驱动

已经移植好了 gc4663，驱动位于 scan/gc4663/sensor_demo_gc4663.c

sdk 的 gc4663 驱动位于 sdk/source/gmp/modules/isp/user/sensor/xm72050200/galaxycore_gc4663_2l/gc4663_sensor_ctl.c 中

主要移植 gc4663_write_register() 和 gc4663_linear_4M30_init() 两个接口<br>
gc4663_write_register() 对应 gc4663_sensor_ctl.c 中的 gc4663_write_register() 函数<br>
gc4663_linear_4M30_init() 对应 gc4663_sensor_ctl.c 中的 gc4663_linear_4M30_init() 函数

移植其他 sensor 请参考 sdk/source/gmp/modules/isp/user/sensor/xm72050200/ 下对应 sensor 的驱动代码。

<br>

## 3. 修改 scan 驱动的 sensor 配置

编译前，根据选用的 sensor，先修改 scan.c scan_init() 中的参数配置：

mipi sensor GC4663 配置：

```c
#if 0
    //default gc4663
    config.width = 2560;
    config.height = 1440;
    config.input_mode = INPUT_MODE_MIPI;
    config.data_type = DATA_TYPE_RAW_10BIT;
    config.sensor_clk = sensor_clk_24;
    config.bayer = BAYER_RGGB;
#endif
```

dvp sensor gc0308 配置：

```c
#if 0 // gc0308
    config.width = 640;
    config.height = 480;
    config.input_mode = INPUT_MODE_CMOS;
    config.data_type = DATA_TYPE_RAW_8BIT;
    config.sensor_clk = sensor_clk_24;
#endif
```

<br>

## 4. 硬件兼容性改动

当前代码默认使用 I2C0(PIN32,33), SENSOR_CLK(PIN34), SENSOR_RSTN(PIN35) 控制 sensor，

在 scan/vi/fixed_set_hal.c 找到代码段，根据实际硬件，修改 I2C，SENSOR 的 pinmux 配置：

```c
FIXED_VOID Fixed_sysconfig_init(base_config *config)
{
    ...

    // 根据硬件原理图 复用gpio
    // i2c0 pin mux
    VI_WRITEL(reg_iocfg_vio_base + 0x0030, 0x1d00);
    VI_WRITEL(reg_iocfg_vio_base + 0x0034, 0x1d00);
    VI_WRITEL(reg_iocfg_vio_base + 0x0030, 0x1d01);
    VI_WRITEL(reg_iocfg_vio_base + 0x0034, 0x1d01);
    VI_WRITEL(reg_iocfg_vio_base + 0x0028, 0x1001);  // mipi_sensor_mux
    VI_WRITEL(reg_iocfg_vio_base + 0x002c, 0x1001);
    
    // i2c0 pin mux gc0308
    //VI_WRITEL(reg_iocfg_vio_base+0x0060, 0x1002);
    //VI_WRITEL(reg_iocfg_vio_base+0x0064, 0x1002);
    
    //VI_WRITEL(reg_iocfg_vio_base+0x0048, 0x1a02);
    //VI_WRITEL(reg_iocfg_vio_base+0x0054, 0x1a02);

    ...
}
```

MIPI 和 DVP 接口的 data 引脚 pinmux 配置，也需要根据硬件进行确认：

```c
    ...

    // mipi dvp pin mux
    if (config->input_mode == INPUT_MODE_MIPI) {
        VI_WRITEL(reg_iocfg_vio_base + 0x0000, 0x1000);  // mipi
        VI_WRITEL(reg_iocfg_vio_base + 0x0004, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0008, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x000C, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0010, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0014, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0018, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x001c, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0020, 0x1000);
        VI_WRITEL(reg_iocfg_vio_base + 0x0024, 0x1000);
    } else if (config->input_mode == INPUT_MODE_CMOS) {
        VI_WRITEL(reg_iocfg_vio_base+0x0000, 0x1002);  //VI_CLK
        VI_WRITEL(reg_iocfg_vio_base+0x0004, 0x1002);  //VI_DATA7
        VI_WRITEL(reg_iocfg_vio_base+0x000C, 0x1002);  //VI_DATA9
        VI_WRITEL(reg_iocfg_vio_base+0x0008, 0x1002);  //VI_DATA8
        VI_WRITEL(reg_iocfg_vio_base+0x0014, 0x1002);  //VI_DATA10
        VI_WRITEL(reg_iocfg_vio_base+0x0010, 0x1002);  //VI_DATA11
        VI_WRITEL(reg_iocfg_vio_base+0x0028, 0x1002);  //VI_DATA6
        VI_WRITEL(reg_iocfg_vio_base+0x002C, 0x1002);  //VI_DATA4
        VI_WRITEL(reg_iocfg_vio_base+0x0034, 0x1C02);  //VI_DATA5
        VI_WRITEL(reg_iocfg_vio_base+0x0050, 0x1002);  //VI_VS
        VI_WRITEL(reg_iocfg_vio_base+0x004C, 0x1002);  //VI_HS

    } else {
    }

    ...
```
如果设备树相对于 SDK 默认配置增加了设备节点，需要根据情况修改中断号。在 fixed_set.c Fixed_VI_CapIrq() 函数中修改 irq_num 的值，一般新增了几个节点就加多少。

```c
FIXED_VOID Fixed_VI_CapIrq(FIXED_VOID)
{
#if 1
    const char *vicap_irq_name = "VI_CAP0";
    unsigned int irq_num = 39;

    if (vi_request_irq(irq_num, Fixed_VI_CapIrqProcess, Fixed_VI_CapIrqProcess_BottomHalf, vicap_irq_name,(void *)&irq_num)) {
        printk("vi irq regist fail\n");
    }
#endif
}
```
加载 xm_scan.ko 后，cat /proc/interrupts 查看 VI_CAP0 的中断源是否是 75，不是就继续修改 irq_num 的值。

<br>

## 5. 编译 sensor 驱动和 dump 程序

编译 sensor 驱动，进入 scan/sensor_demo/gc4663 中，运行

```sh
arm-gcc7.3-linux-musleabi-gcc sensor_demo_gc4663.c -o sensor_demo_gc4663
```

编译 dump 程序，进入 scan/sensor_demo/sensor_dump 中，运行

```sh
arm-gcc7.3-linux-musleabi-gcc sensor_dump.c -o sensor_dump
```

<br>

## 6. 运行

首先插入 scan 驱动，`insmod xm_scan.ko`

然后运行 sensor 驱动，`./sensor_demo_gc4663`

然后运行 dump 程序，`./sensor_dump 0x42062000 2560 1440 10`，不带参数运行可以查看 help 参数解释

这里说明下 addr 参数（0x42062000），该地址用于 dump 数据时使用的 mmz 物理地址，相当于 VB 的物理地址，需要填写 mmz 空间的合法物理地址，并预留等于 dump 的 YUV/RAW 数据大小的足够空间<br>
具体需要根据系统分配的 mmz 空间起始地址来做调整

sensor_dump 运行成功，会在当前目录下生成抓图文件，如 1920x1080_10bit.raw

<br>
