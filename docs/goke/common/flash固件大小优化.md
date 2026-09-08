1. 可执行文件大小优化，收益接近 50%

```
upx --best -o multi_cam.upx multi_cam
                       Ultimate Packer for eXecutables
                          Copyright (C) 1996 - 2026
UPX 5.2.0       Markus Oberhumer, Laszlo Molnar & John Reiser    Jun 8th 2026

        File size         Ratio      Format      Name
   --------------------   ------   -----------   -----------
   6719112 ->   3332280   49.59%    linux/arm    multi_cam.upx                 

Packed 1 file.
```

2. 驱动尽量 buildin，内核的压缩率更高
3. 内核换 xz 压缩算法