# fw_printfenv 使用

## 一、编译

先编译一遍 SDK

然后进入 `out/xm72020300/boot_builddir` 目录

编译 fw_printfenv 源码 `make ARCH=arm CROSS_COMPILE=arm-gcc7.3-linux-musleabi- envtools` 

## 二、内核配置

在使用 fw_printfenv 时遇到错误 `Error locking file /var/lock/fw_printfenv.lock` 

内核可能默认不配置 POSIX 标准文件锁定 API，所以程序执行到文件加锁与解锁的 flock() 时失败

在内核 menuconfig 中搜索 `CONFIG_FILE_LOCKING`，打卡如下配置，重新编译内核

```
[*] Enable POSIX file locking API
[*]   Enable Mandatory file locking (NEW)
```

## 三、修改配置文件

fw_env.config 文件用于配置 fw_printfenv 工具指向的环境变量分区。

以 xm72020300 为例，在 fw_env.config 文件注释掉其他行，新增以下配置：

```
# NOR example
# MTD device name       Device offset   Env. size       Flash sector size       Number of sectors
/dev/mtd1               0x0000          0x10000         0x20000                 1
```

1. MTD device name 通过 `cat /proc/mtd`，确认 bootargs 分区名为 mtd1
2. Device offset 为相对于 MTD device name 指定的分区的偏移，因为整个分区是单独的环境变量分区，因此是 0x0000
3. Env. size 查看 uboot 源码目录下的 `configs/xm72020300_quickstart_defconfig` 文件中的宏定义 `CONFIG_ENV_SIZE=0x10000` 
4. Flash sector 查看 uboot 源码目录下的 `include/configs/xm72020300.h` 文件中的宏定义 `#define CONFIG_ENV_OFFSET 0x20000` 和 `configs/xm72020300_quickstart_defconfig` 文件中的宏定义 `CONFIG_ENV_OFFSET=0x20000`
5. Number of sectors 根据实际情况，一般为 1

## 四、使用

将编译后的 fw_printfenv 执行程序拷贝到板端，fw_env.config 文件拷贝到板端 `/etc` 目录下

**必要**，创建 fw_setenv 软链接，`ln -s fw_printfenv fw_setenv `

`fw_printfenv -h` 查看帮助

`fw_printfenv ` 相当于 printenv，打印环境变量信息

`fw_setenv $变量 $值` 相当于 setenv+saveenv，设置和保存环境变量信息

## 五、通过代码使用

链接 lib.a 库，参考 fw_env_main.c 实现

## 六、常见问题

1. 如果内核打开了 POSIX 标准文件锁定 API 配置后仍然遇到 `Error locking file /var/lock/fw_printfenv.lock` ，检查该目录的文件系统是否为只读

## 七、参考链接

[海思 fw_printenv 和 fw_setenv 工具详解_积步千里的博客-CSDN博客](https://blog.csdn.net/m0_37383484/article/details/129561114?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-5-129561114-blog-124358700.235^v38^pc_relevant_anti_vip_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-5-129561114-blog-124358700.235^v38^pc_relevant_anti_vip_base&utm_relevant_index=8)

[fw_printfenv不可用(Error locking file /var/lock/fw_printenv.lock) | 全志在线开发者论坛 (aw-ol.com)](https://bbs.aw-ol.com/topic/2923/fw_printfenv不可用-error-locking-file-var-lock-fw_printenv-lock)

[在linux系统中通过fw_printenv查看和设置u-boot中的环境变量-CSDN博客](https://blog.csdn.net/xl19862005/article/details/118342662)
