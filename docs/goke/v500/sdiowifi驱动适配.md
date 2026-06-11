# sdio wifi 驱动适配

- [sdio wifi 驱动适配](#sdio-wifi-驱动适配)
  - [1.1 概述](#11-概述)
  - [1.2 内核配置](#12-内核配置)
    - [1.2.1 打开栈保护](#121-打开栈保护)
    - [1.2.2 修改 linux 设备树，添加 SDIO 中断](#122-修改-linux-设备树添加-sdio-中断)
    - [1.2.3 修改相位偏移](#123-修改相位偏移)
  - [1.3 配置 SDIO 管脚复用](#13-配置-sdio-管脚复用)
  - [1.4 编译wifi驱动代码](#14-编译wifi驱动代码)
  - [1.5 编译第三方工具](#15-编译第三方工具)
    - [1.5.1 下载第三方工具](#151-下载第三方工具)
    - [1.5.2 修改编译配置](#152-修改编译配置)
    - [1.5.3 编译](#153-编译)
  - [1.6 载入驱动和第三方工具](#16-载入驱动和第三方工具)
  - [1.7 wifi设备检测](#17-wifi设备检测)
  - [1.8 加载驱动](#18-加载驱动)
  - [1.9 启动 ap 和 udhcpd](#19-启动-ap-和-udhcpd)

## 1.1 概述

sdio 提供标准接口对接外围设备，本文以 Hi3881 为例，说明在 sdk 上适配 sdio wifi 的过程。

## 1.2 内核配置

### 1.2.1 打开栈保护

```
    ->General setup
        ->Stack Protector buffer overflow detection
```

选择strong

### 1.2.2 修改 linux 设备树，添加 SDIO 中断

`linux-4.9.y/arch/arm/boot/dts/xm720xxx.dtsi` 文件中配置对应的 mmc 属性中增加 `cap-sdio-irq`，如图所示：

```dts
        mmc1: sdhci@0x10020000 {
            compatible = "xmedia,sdhci";
            reg = <0x10020000 0x1000>;
            interrupts = <0 31 4>;
            clocks = <&clock XM720XXX_MMC1_CLK>;
            clock-names = "mmc_clk";
            resets = <&clock 0x22c 27>, <&clock 0x22c 29>;
            reset-names = "crg_reset", "dll_reset";
            max-frequency = <50000000>;
            crg_regmap = <&clock>;
            iocfg_regmap = <&iocfg_ctrl2>;
            bus-width = <4>;
            cap-sd-highspeed;
            full-pwr-cycle;
            cap-sdio-irq;
            devid = <2>;
            status = "enable";
        };
```

### 1.2.3 修改相位偏移

为保证与 SDIO 对接芯片的正常工作，需要 SDIO Host 控制器的接收方向采样时钟进行相位偏移，请根据具体硬件修改。

对于 VDDIO=3.3V 时，Host 控制器的采样时钟相位偏移 90 度。 

对于 VDDIO=1.8V 时，Host 控制器的采样时钟相位偏移 135 度。 

示例：当采样时钟为 50MHz 时，相位偏移 90 度即为延时 5 ns，相位偏移 135 度即为延时 7.5 ns。

VDDIO = 3.3V 的配置步骤如下：
`linux-4.9.y/drivers/mmc/host/sdhci-xm720xxx.c`，
在 `static void bsp_get_phase(struct sdhci_host *host) ` 函数中修改为：
`bsp_priv->sampl_phase = 8/fix_num;   //4为45度，8为90度，16为180度`

如图所示：

```c
        if ((host->mmc->ios.timing == MMC_TIMING_SD_HS) ||
            (host->mmc->ios.timing == MMC_TIMING_UHS_SDR25)) {
            bsp_priv->drv_phase = 16/fix_num;  /* 16 for 180 degree */
            bsp_priv->sampl_phase = 8/fix_num; /* 4 for 45 degree */
        } else {
            /* UHS_SDR12 */
            bsp_priv->drv_phase = 16/fix_num;  /* 16 for 180 degree */
            bsp_priv->sampl_phase = 0; /* 0 for 0 degree */
        }
```

修改后需重新编译kernel

## 1.3 配置 SDIO 管脚复用

请根据硬件设计将 xm720xxx 的管脚复用为 SDIO 模式

管脚复用方法：

- 配置 uboot 表格
- 系统启动脚本中使用 xmmm
- 命令配置寄存器
- 在 wifi 驱动代码中添加代码配置寄存器
- 其它方式

以修改 uboot 表格为例，请参照管脚复用表格配置相应的寄存器

|register|offset Address|value W to or R fr Reg|delay|Read or Write|bits to be read or written|start bit|register attribute|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| iocfg_reg33 | 0x112C0048 | 0x1D54 | 0 | write | 31 | 0 | 0x000000FD |
| iocfg_reg34 | 0x112C004C | 0x1174 | 0 | write | 31 | 0 | 0x000000FD |
| iocfg_reg40 | 0x112C0064 | 0x1174 | 0 | write | 31 | 0 | 0x000000FD |
| iocfg_reg39 | 0x112C0060 | 0x1174 | 0 | write | 31 | 0 | 0x000000FD |
| iocfg_reg38 | 0x112C005C | 0x1174 | 0 | write | 31 | 0 | 0x000000FD |
| iocfg_reg37 | 0x112C0058 | 0x1174 | 0 | write | 31 | 0 | 0x000000FD |

修改后需重新编译uboot

## 1.4 编译wifi驱动代码

请参考 wifi 厂商的相关文档进行驱动的编译，以下均为参考 hi3881 的文档的描述。

请根据硬件设计适配 SDIO 所属的MMC接口，用于 SDIO 卡到位检测，修改 wifi 驱动 SDK 中的：

`driver/oal/oal_sdio_host.c`

```c
s32 oal_sdio_detect_to_core(s32 val)
{
    ...
    sdio_card_detect_change(1);
    ...
}
```

编译 wifi 驱动，修改 wifi 驱动SDK下 Makefile 中，
`CROSS_COMPILE` 为交叉编译工具链名称、
`KDIR` 为已经编译好的内核路径、
`ARCH` 为平台类型，
然后执行脚本 `build.sh` 编译。
如图：

```
KDIR=/home/test/XmediaIPCLinuxVxxxRxxxSPCxxx/out/xm720xxx/linux-4.9.y
ARCH=arm
CROSS_COMPILE=arm-gcc7.3-linux-musleabi-
```

以module模式编译命令(示例)：

```
HODT_PLATFORM=XM72020330 sh build.sh -m
```

## 1.5 编译第三方工具

请参考 wifi 厂商的相关文档进行驱动的编译，以下均为参考 hi3881 的文档的描述。

### 1.5.1 下载第三方工具

- hostapd
- wpa_supplicant
- libnl

### 1.5.2 修改编译配置
将 wpa_supplicant, hostapd 和 libnl 压缩文件拷贝到 wifi 驱动 SDK 的 components/linux/wpa_supplicant/, components/linux/hostapd/和components/linux/libnl/ 目录下。并解压 wpa 压缩包，用 components/linux/wpa_supplicant/ 目录里面的 defconfig 替换解压出的目录中wpa_supplicant/defconfig，重新压缩文件。
修改 wifi 驱动 SDK 中 components/linux/Makefile 文件中的交叉编译工具链以及 wpa_supplicant，hostapd，libnl 目录下 Makefile 中的交叉编译工具链：

`CROSS_COMPILE   ?= arm-gcc7.3-linux-musleabi-`

### 1.5.3 编译

`make tools`

生成的目标文件在components/linux/out目录下

## 1.6 载入驱动和第三方工具

请参考 wifi 厂商的相关文档进行驱动的编译，以下均为参考 hi3881 的文档的描述。

- 驱动文件拷贝

若80211在内核中为buildin模式则不需要拷贝cfg80211.ko驱动，若为module模式cfg80211.ko位置如下：

`/home/test/XmediaIPCLinuxVxxxRxxxSPCxxx/out/xm720xxx/linux-4.9.y/net/wireless/cfg80211.ko`

wifi驱动生成位置如下：

`driver/hi3881.ko`

将以上驱动拷贝到单板上的 `/kmod` 目录下

在单板中新建目录

`mkdir -p /vendor/firmware/hisilicon`

将wifi驱动SDK中的

```
firmware/wifi_fw.bin
firmware/wifi_cfg/ce/wifi_cfg
```

拷贝到单板/vendor/firmware/hisilicon目录下

- 生成动态链接

将wifi驱动SDK中的

```
components/linux/out/libnl-3.so.200.26.0
components/linux/out/libnl-genl-3.so.200.26.0
```

复制到单板的 `/lib` 目录下。

进入目录，创建这两个文件的软连接：

```
ln -s libnl-3.so.200.26.0 libnl-3.so.200
ln -s libnl-genl-3.so.200.26.0 libnl-genl-3.so.200
```

- sta模式：将wifi驱动SDK中的

```
components/linux/out/wpa_supplicant
components/linux/out/wpa_cli
```

拷贝到单板的`/bin`下，并添加执行权限（AP模式不需要）

- ap模式：将wifi驱动SDK中的

`components/linux/hostapd/entropy.bin`

文件放到单板的 `/etc/Wireless`（若没有则新建）目录下。 将wifi驱动SDK中的

`components/linux/out/hostapd`

拷贝到单板的`/bin`下，并添加执行权限

## 1.7 wifi设备检测

加载驱动前需要先检测到SDIO设备，可以通过查看 mci_info 来查看是否检测到 SDIO 设备：

`cat /proc/mci/mci_info`

如图，有 MCI 信息即为成功检测到 SDIO 设备：

```sh
MCI0: unplugged_disconnected
MCI1: pluged_connected
        Type: SDIO card Mode: HS
        Speed Class: Class 0
        Uhs Speed Grade: Less than 10MB/sec(0h)
        Host work clock: 50MHz
        Card support clock: 50MHz
        Card work clock: 50MHz
        Card error count: 0
MCI2: invalid
```

如果没有 MCI 信息，一般多是硬件链路问题，请检查

- wifi 模块是否正常工作，
- wifi enable 引脚是否使能
- sdio 线路是否正常
- sdio 电压域是否配置正确
- 其他硬件原因

## 1.8 加载驱动
若 80211 在内核中为 buildin 模式则不需要加载 cfg80211.ko 驱动，若为 module 模式则

执行命令加载驱动：

```
insmod /komod/cfg80211.ko
insmod /komod/hi3881.ko g_mode=1
```

配置 hostapd.conf，通过配置 hostapd.conf 可以配置 ap 的不同属性（SSID、信道、加密方式等） 测试配置如下：

`/etc/Wireless/hostapd.conf`

```
interface=ap0
driver=nl80211
ctrl_interface=/var/hostapd
ssid=Test_AP
channel=6
hw_mode=g
ieee80211n=1
ht_capab=[SHORT-GI-20]
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_passphrase=12345678
```

配置含义为名称为 Test_AP，密码为 12345678 的 hostap；若不需要密码，注释掉最后三行。

配置udhcpd：udhcpd 需要配置文件 `/etc/Wireless/udhcpd.config`，参考配置如下：

```
# The start and end of the IP lease block
start           192.168.1.20 
end             192.168.1.254

# The interface that udhcpd will use
interface       ap0

opt dns 192.168.1.2 192.168.10.10
option  subnet  255.255.255.0
opt router  192.168.1.2
```

## 1.9 启动 ap 和 udhcpd

启动hostapd：
`hostapd -e/etc/Wireless/entropy.bin /etc/Wireless/hostapd.conf &`

如图：

```
~ # hostapd -e/etc/Wireless/entropy.bin /etc/Wireless/hostapd.conf &
Configuration file: /etc/Wireless/hostapd.conf
HT (IEEE 802.11n) with WPA/WPA2 requires CCMP/GCMP to be enabled, disabling HT capabilities
OK
ap0: Could not connect to kernel driver
Using interface ap0 with hwaddr 8a:11:31:0f:40:6b and ssid "Test_AP"
random: Cannot read from /dev/random: Resource temporarily unavailable
random: Only 0/20 bytes of strong random data available
random: Allow operation to proceed based on internal entropy
ap0: interface state UNINITIALIZED->ENABLED
ap0: AP-ENABLED
```

启动udhcpd：

```
ifconfig ap0 192.168.1.1
udhcpd -fS /etc/Wireless/udhcpd.config &
```

如图：

```
udhcpd: started, v1.26.2
```

用设备连接，udhcpd 会自动为其分配地址： 如图：

```
ap0: STA be:11:31:69:26:6d IEEE 802.11: associated
random: Cannot read from /dev/random: Resource temporarily unavailable
random: Only 0/20 bytes of strong random data available
random: Allow operation to proceed based on internal entropy
ap0: AP-STA-CONNECTED be:11:31:69:26:6d
ap0: STA be:11:31:69:26:6d RADIUS: starting accounting session 94C28C301BDBCE7E
ap0: STA be:11:31:69:26:6d WPA: pairwise key handshake completed (RSN)

udhcpd: sending OFFER of 192.168.1.20
udhcpd: sending ACK to 192.168.1.20
udhcpd: sending ACK to 192.168.1.20
```

ping 该地址测试，如图：

```
PING 192.168.1.20 (192.168.1.20): 56 data bytes
64 bytes from 192.168.1.20: seq=0 ttl=64 time=41.493 ms
64 bytes from 192.168.1.20: seq=1 ttl=64 time=60.842 ms
64 bytes from 192.168.1.20: seq=2 ttl=64 time=75.575 ms
64 bytes from 192.168.1.20: seq=3 ttl=64 time=93.313 ms
^C
--- 192.168.1.20 ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 41.493/67.805/93.313 ms
```

至此AP启动成功。

## 1.10 sta 模式和 udhcpc

### 1.10.1 准备 udhcpc 配置

拷贝 `sdk/out/xm72020330/rootfs_builddir/busybox-1_26_2/examples/udhcp/simple.script` 到板端 udhcpc 的默认配置路径 `/usr/share/udhcpc/default.script`

### 1.10.2 编译 wpa_supplicant

https://blog.csdn.net/Turix/article/details/112910483

### 1.10.3 准备 wpa_supplicant 配置文件

```
ctrl_interface=/var/run/wpa_supplicant
update_config=1

network={
	ssid="wifi-ssid"
	psk="wifi-psk"
	key_mgmt=WPA-PSK
}
```

### 1.10.4 运行

连接 Wi-Fi

```
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
```

自动获取 IP

```
udhcpc -i wlan0 &
```

查询 Wi-Fi 状态

```
wpa_cli -i wlan0 status
```