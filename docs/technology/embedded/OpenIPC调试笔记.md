# 调试笔记

## 运行

首次上电会检测 sensor 和初始化配置，

重启后，需要进入 uboot，修改 bootargs，将 `rootfstype=` 改成 `rootfstype=squashfs`

gk7205v200
```
mem=32M console=ttyAMA0,115200 panic=20 rootfstype=squashfs root=/dev/mtdblock3 init=/init mtdparts=sfc:256k(boot),64k(env),2048k(kernel),${rootmtd}(rootfs),-(rootfs_data) mmz_allocator=gk
```

gk7205v300
```
mem=128M console=ttyAMA0,115200 panic=20 rootfstype=squashfs root=/dev/mtdblock3 init=/init mtdparts=sfc:256k(boot),64k(env),2048k(kernel),${rootmtd}(rootfs),-(rootfs_data) mmz_allocator=cma mmz=anonymous,0,0x42000000,96M
```
