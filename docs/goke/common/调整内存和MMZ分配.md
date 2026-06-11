# 调整内存和 MMZ 分配

以 OS 内存从 32M 调整到 40M 为例。

## 1. 修改 Bootargs

在 sdk/configs/xm72020330/prebuilts/spi_bootargs_tiny.txt 中，修改 mem

bootargs=**mem=32M** console=ttyAMA0,115200 root=/dev/mtdblock3 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),4M(kernel),11M(rootfs) lpj=9838592

修改为

bootargs=**mem=40M** console=ttyAMA0,115200 root=/dev/mtdblock3 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),4M(kernel),11M(rootfs) lpj=9838592



如果是快启版本，需要在 sdk/configs/xm72020330/prebuilts/spi_bootargs_buildin_tiny.txt 中修改

bootargs=**mem=32M** console=ttyAMA0,115200 loglevel=0 root=/dev/mtdblock3 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),4M(kernel),11M(rootfs) mmz_allocator=xmedia mmz=anonymous,0,**0x42000000**,**32M** chip=xm72020330 sensors=gc2053 g_cmos_yuv_flag=0 board=demo save_power=0 lpj=9838592 max_node_num=20

=>

bootargs=**mem=40M** console=ttyAMA0,115200 loglevel=0 root=/dev/mtdblock3 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),4M(kernel),11M(rootfs) mmz_allocator=xmedia mmz=anonymous,0,**0x42800000**,**24M** chip=xm72020330 sensors=gc2053 g_cmos_yuv_flag=0 board=demo save_power=0 lpj=9838592 max_node_num=20



## 2. 调整加载驱动时的参数

在使用 load 脚本加载媒体驱动时，调整参数

./load xm72020330 -i -sensor gc2053 **-osmem 40**
