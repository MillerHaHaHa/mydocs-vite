## 一、Kernel 配置

### kernel 4.9

打开以下内核配置

```
CONFIG_ELF_CORE
CONFIG_CRASH_DUMP
CONFIG_CORE_DUMP_DEFAULT_ELF_HEADERS
CONFIG_PROC_VMCORE
CONFIG_COREDUMP
```

### kernel 5.10

打开以下内核配置
```
CONFIG_COREDUMP=y
CONFIG_ALLOW_DEV_COREDUMP=y
CONFIG_ELF_CORE=y
```



## 二、板端配置

设置转存路径，放开 coredump 大小限制

```shell
mount -t tmpfs tmpfs /tmp
echo "/tmp/core-%e-%p-%t" > /proc/sys/kernel/core_pattern
ulimit -c unlimited
```

或者设置转存路径到 sd 卡

```
echo "/mnt/sdcard/core-%e-%p-%t" > /proc/sys/kernel/core_pattern
```

核心太大的话，可以只保留部分数据

```shell
ulimit -c 1024
```



## 三、测试 coredump 生效

### shell 触发

```
kill -s SIGSEGV $$
```

### 简单 C 程序触发

```
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



## 四、可能遇到的问题

### 1. 没有调试信息

不要 strip
