kernelA-5.10

```
sf probe 0;xmediaapp;boothz 0x41000000 0x40008000 0x100000 0x280000
```

kernalB-4.9

```
sf probe 0;xmediaapp;boothz 0x41000000 0x40008000 0x880000 0x280000
```

rootfsA

```
mem=32M console=ttyAMA0,115200 root=/dev/mtdblock3 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),2560K(kernel),5M(rootfs),2560K(kernelB),5M(rootfsB)
```

rootfsB

```
mem=32M console=ttyAMA0,115200 root=/dev/mtdblock5 rootfstype=jffs2 rw mtdparts=sfc:512K(boot),512K(bootargs),2560K(kernel),5M(rootfs),2560K(kernelB),5M(rootfsB)
```



S02upgrade 脚本

```
#!/bin/sh

upgrade_partition=$(fw_printenv -n upgrade_partition)
latest_partition=$(fw_printenv -n latest_partition)

if [ $upgrade_partition != $latest_partition ]; then
    if [ $upgrade_partition == "0" ]; then
      echo "upgrade to A partition ok"
    else
      echo "upgrade to B partition ok"
    fi
    fw_setenv latest_partition $upgrade_partition
fi
```