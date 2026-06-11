# 去掉 bootargs 分区

## 1. 修改 menuconfig

1）进入 uboot menuconfig，`cd out/720xxxxx/boot_builddir`, `make COMPILE_TOOLCHAIN=arm-gcc7.3-linux-musleabi- ARCH=arm menuconfig`。

2）在 menuconfig 找到下面的选项，修改以下配置：

```
[*] Enable boot arguments
(mem=32M console=ttyAMA0,115200 loglevel=0 root=/dev/mtdblock2 rootfstype=jffs2 rw mtdparts=sfc:128K(boot),4480K(kernel),-(rootfs)
[*] Enable a default value for bootcmd                                     (sf probe 0;xmediaapp;boothz 0x41000000 0x40008000 0x20000 0x460000) bootcmd value
```

3）将正在使用的 spi_bootargs_tiny.txt 或者 spi_bootargs_buildin_tiny.txt 中的 bootcmd 和 bootargs 参数覆写到这对应的选项中。

4）关闭从 spi flash 或其他媒介读取环境变量

```
Environment->
  [*] Environment is not stored
  [ ] Environment is in SPI flash
```

## 2. 修改烧录 xml

修改 spi_partitions_buildin_tiny.xml 文件，去掉 bootargs 分区

并适当调整各分区的偏移位置

