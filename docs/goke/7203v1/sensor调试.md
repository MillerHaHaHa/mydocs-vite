检查 I2C 引脚

```
xmmd.l 0x2000097c
```

```
xmmd.l 0x20000980
```

00400602

检查 sensor clk

```
xmmd.l 0x20000930
```

00401f03

检查 sensor rst

```
xmmd.l 0x2000091c
```

00400b52

设置 sensor1 clock

```
xmmm 0x20000258 f0000fb0
```

读 i2c

```
i2c_read 0x1 0x80 0xf0
```