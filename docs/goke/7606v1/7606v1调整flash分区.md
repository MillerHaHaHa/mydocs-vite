# 7606v1 调整 flash 分区

## 1. 修改 env

1）修改 bootargs

bootargs=mem=32M console=ttyAMA0,115200 no_console_suspend root=/dev/mtdblock4 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),256K(bootargs),256K(bl31),4M(kernel),11M(rootfs) earlycon=pl011,mmio32,0x12040000

=>

bootargs=mem=60M console=ttyAMA0,115200 no_console_suspend root=/dev/mtdblock4 rootfstype=jffs2 rw mtdparts=sfc:256K(boot),128K(bootargs),128K(bl31),4M(kernel),-(rootfs) earlycon=pl011,mmio32,0x12040000

------

2）修改 bootcmd

bootcmd=xmediaapp;sf probe 0;sf read 0x40008000 0xC0000 0x40000;sf read 0x40FFFFC0 0x100000 0x400000;bootm 0x40FFFFC0

=>

bootcmd=xmediaapp;sf probe 0;sf read 0x40008000 0x60000 0x20000;sf read 0x40FFFFC0 0x80000 0x400000;bootm 0x40FFFFC0

*参数说明*：

sf read 0x40008000 0xC0000 0x40000

0xC0000 是 bl31 分区的偏移位置

0x40000 是 bl31 分区的大小

sf read 0x40FFFFC0 0x80000 0x400000

0x80000 是 kernel 分区的偏移位置

0x400000 是 kernel 分区的大小



## 2. 修改 cfg.mk

修改 sdk/cfg.mk

```
CONFIG_XMEDIA_BOOT_ENV_STARTADDR=0x80000
CONFIG_XMEDIA_BOOT_ENV_SIZE=0x10000
```

=>

```
CONFIG_XMEDIA_BOOT_ENV_STARTADDR=0x40000
CONFIG_XMEDIA_BOOT_ENV_SIZE=0x10000
```



## 3. 修改 uboot

修改 source/bootloader/u-boot-2020.01/configs/xmfalcon_defconfig

```
CONFIG_ENV_SIZE=0x10000
CONFIG_ENV_OFFSET=0x80000
```

=>

```
CONFIG_ENV_SIZE=0x10000
CONFIG_ENV_OFFSET=0x40000
```



## 4. 修改烧录 xml

修改 sdk/configs/xm7605v12/prebuilts/spi_partitions.xml，一般直接在 FastBurn 工具中修改后保存，将 out/xm7605v12/image/spi_image/spi_partitions.xml 替换掉 sdk/configs/xm7605v12/prebuilts/spi_partitions.xml 的即可。

```
<?xml version="1.0" encoding="utf-8" ?>
<Partition_Info>
        <Part Select="1" PartName="fastboot" StorageMedia="spi-nor" ImageFormat="raw"   StartAddr="0"    PartLen="512K" ImagePath="uboot.bin" />
        <Part Select="1" PartName="bootargs" StorageMedia="spi-nor" ImageFormat="raw"   StartAddr="512K" PartLen="256K" ImagePath="bootargs.bin" />
        <Part Select="1" PartName="bl31"     StorageMedia="spi-nor" ImageFormat="raw"   StartAddr="768K" PartLen="256K"   ImagePath="bl31" />
        <Part Select="1" PartName="kernel"   StorageMedia="spi-nor" ImageFormat="raw"   StartAddr="1M"   PartLen="4M"   ImagePath="kernel" />
        <Part Select="1" PartName="rootfs"   StorageMedia="spi-nor" ImageFormat="jffs2" StartAddr="5M"   PartLen="11M"  ImagePath="rootfs.64k.jffs2" />
</Partition_Info>
```

=>

```
<?xml version="1.0" encoding="utf-8" ?>
<Partition_Info>
        <Part Select="1" PartName="fastboot" StorageMedia="spi-nor" ImageFormat="raw" StartAddr="0" PartLen="256K" ImagePath=".\uboot.bin" />
        <Part Select="1" PartName="bootargs" StorageMedia="spi-nor" ImageFormat="raw" StartAddr="256K" PartLen="128K" ImagePath=".\bootargs.bin" />
        <Part Select="1" PartName="bl31" StorageMedia="spi-nor" ImageFormat="raw" StartAddr="384K" PartLen="128K" ImagePath=".\bl31" />
        <Part Select="1" PartName="kernel" StorageMedia="spi-nor" ImageFormat="raw" StartAddr="512K" PartLen="4M" ImagePath=".\kernel" />
        <Part Select="1" PartName="rootfs" StorageMedia="spi-nor" ImageFormat="jffs2" StartAddr="4608K" PartLen="11776K" ImagePath=".\rootfs.64k.jffs2" />
</Partition_Info>
```

