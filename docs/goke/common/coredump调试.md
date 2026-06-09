# core dump 调试

## 1. kernel 配置

进入 menuconfig，以 xm72010200_tiny_defconfig 为例

搜索以下配置并打开

```
CONFIG_ELF_CORE
CONFIG_CRASH_DUMP
CONFIG_CORE_DUMP_DEFAULT_ELF_HEADERS
CONFIG_PROC_VMCORE
```

并确认以下配置已打开

```
CONFIG_COREDUMP
```



## 2. 设置 coredump 转存路径

根据实际情况修改以下路径

```sh
echo "/mnt/sdcard/core-%e-%p-%t" > /proc/sys/kernel/core_pattern
```



## 3. 设置 coredump 大小

```sh
ulimit -c unlimited
```

核心太大的话，建议只保留部分数据

```sh
ulimit -c 1024
```



## 4. 测试 coredump

shell 触发

```sh
kill -s SIGSEGV $$
```

程序触发

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, int *argv[])
{
	int *ptr = NULL;
    printf("Dereferencing a NULL pointer...\n");
    printf("%d\n", *ptr); // 尝试解引用空指针，将导致段错误
    return 0;
}
```



## 5. 编译 gdb

在 sdk 根目录 `make menuconfig`

搜索 XMEDIA_GDB_SUPPORT 并打开

保存配置，`make build`

编译完成后，找到 gdb 工具 out/xm72010200/rootfs/bin/gdb 并复制到板端



## 6. gdb 调试

百度一下

