# 快启 buildin 版本新增驱动

以在快启 buildin 版本中新增 watchdog，adc 驱动为例。

## 1. 新增编译对象

修改以下路径的 Makefile：

> source/gmp/ko/xm72050200/linux-4.9.y/obj_dynamic/obj_log/Makefile
>
> source/gmp/ko/xm72050200/linux-4.9.y/obj_static/obj_log/Makefile
>
> source/gmp/ko/xm72050500/linux-4.9.y/obj_dynamic/obj_log/Makefile
>
> source/gmp/ko/xm72050500/linux-4.9.y/obj_static/obj_log/Makefile

p.s nolog 版本需要修改对应的 obj_nolog

watchdog 驱动的 .o 文件是 wdt.o，找到行 `#$(ARCH_NAME)_wdt-objs = wdt.o` 去掉注释，改为 `$(ARCH_NAME)_wdt-objs = wdt.o`

adc 驱动的 .o 文件是 adc.o，找到行 `#$(ARCH_NAME)_adc-objs = adc.o` 去掉注释，改为 `$(ARCH_NAME)_adc-objs = adc.o`

## 2. 将 .o 编译到驱动中

修改 source/gmp/modules/Makefile，增加：

```makefile
objects += adc
objects += wdg
```   

## 3. 新增驱动初始化调用

修改 source/gmp/modules/init/linux/xmedia_init.c，增加：

```c
adc_driver_init();
wdt_driver_init();
```

## 4. 解决编译问题

修改 source/gmp/modules/init/linux/wdt_init.c 和<br>
source/gmp/modules/init/linux/adc_init.c，增加引用的头文件

   ```
   #include "type.h"
   #include "common.h"
   #include "osal.h"
   ```

## 5. 重新编译 gmp 和 kernel

```bash
make gmp_clean
make linux_clean
make build -j
```
