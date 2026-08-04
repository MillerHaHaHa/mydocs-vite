# Nand Flash 相关配置

## kernel

### kernel 4.9

bootcmd 修改

```
bootcmd=nand read 0x1000000 0x2000000 0x800000;bootm 0x1000000
↓
bootcmd=nand read 0x41000000 0x100000 0x400000;go 0x41000000
```



### kernel 5.10

不用改