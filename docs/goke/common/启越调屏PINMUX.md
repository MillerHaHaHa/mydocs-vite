# 启越调屏 PINMUX

## 1、PINMUX 表

| pin name  | pin num | reg addr   | reg value | function  |
| --------- | ------- | ---------- | --------- | --------- |
| BL_PCTL   | 71      | 0x100C0010 | 0x1000    | GPIO0_4   |
| LCD_RESET | 27      | 0x112C0044 | 0x1A00    | GPIO5_1   |
| LCD_CS    | 28      | 0x112C0040 | 0x1007    | SPI0_CSN  |
| LCD_SCL   | 29      | 0x112C003C | 0x1807    | SPI0_SCLK |
| LCD_SDA   | 30      | 0x112C0038 | 0x1807    | SPI0_SDO  |
| LCD_VS    | 25      | 0x112C0050 | 0x1025    |           |
| LCD_HS    | 23      | 0x112C004C | 0x1025    |           |
| LCD_DE    | 24      | 0x112C0054 | 0x1025    |           |
| LCD_CLK   | 22      | 0x112C0048 | 0x1065    |           |
| LCD_DATA2 | 14      | 0x112C006C | 0x1025    |           |
| LCD_DATA3 | 15      | 0x112C0068 | 0x1025    |           |
| LCD_DATA4 | 17      | 0x112C0058 | 0x1025    |           |
| LCD_DATA5 | 18      | 0x112C005C | 0x1025    |           |
| LCD_DATA6 | 19      | 0x112C0060 | 0x1025    |           |
| LCD_DATA7 | 21      | 0x112C0064 | 0x1025    |           |


## 2、脚本

config.sh

```
#!/bin/sh

cd /komod
./load xm72010300 -i -sensor sc223a -osmem 32
sh /root/lcd_init.sh
```

lcd_init.sh

```
#!/bin/sh

#BL_PCTL
xmmm 0x100C0010 0x1000
#LCD_RESET
xmmm 0x112C0044 0x1A00
#LCD_CS
xmmm 0x112C0040 0x1007
#LCD_SCL
xmmm 0x112C003C 0x1807
#LCD_SDA
xmmm 0x112C0038 0x1807
#LCD_VS
xmmm 0x112C0050 0x1025
#LCD_HS
xmmm 0x112C004C 0x1025
#LCD_DE
xmmm 0x112C0054 0x1025
#LCD_CLK
xmmm 0x112C0048 0x1065

#LCD_DATA2
xmmm 0x112C006C 0x1025
#LCD_DATA3
xmmm 0x112C0068 0x1025
#LCD_DATA4
xmmm 0x112C0058 0x1025
#LCD_DATA5
xmmm 0x112C005C 0x1025
#LCD_DATA6
xmmm 0x112C0060 0x1025
#LCD_DATA7
xmmm 0x112C0064 0x1025
```

