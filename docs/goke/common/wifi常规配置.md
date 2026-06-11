# 启动 wifi 常规的配置

## 1. sta 启动

### wifi 启动脚本

sta.sh 脚本内容：

```sh
#!/bin/sh

insmod /komod/hi3881.ko g_mode=0

killall -9 hostapd

killall -9 wpa_supplicant

killall -9 udhcpc

killall -9 udhcpd

wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf

udhcpc -i wlan0
```



### 设置 /etc/wpa_supplicant.conf

wpa_supplicant.conf 内容：

```
ctrl_interface=/var/run/wpa_supplicant
update_config=1

network={
        ssid="GOKE1-Guest"
        psk="szlh123456"
        key_mgmt=WPA-PSK
}
```



### 设置 udhcpc 配置脚本

将 sdk busybox 的 examples/udhcp/simple.script，于 sdk 路径：

> sdk/out/xm720xxxxx/rootfs_builddir/busybox-1_26_2/examples/udhcp/simple.script

拷贝到板端 udhcpc 配置脚本默认路径 `/usr/share/udhcpc/default.script`



## 2. ap 启动

hostapd.sh 脚本内容：

```sh
#!/bin/sh

insmod /komod/8733bs.ko

killall -9 hostapd

killall -9 wpa_supplicant

killall -9 udhcpc

killall -9 udhcpd

ifconfig wlan0 192.168.0.1 up

hostapd /etc/rtl_hostapd_2G.conf &
#hostapd /etc/rtl_hostapd_5G.conf &

udhcpd /etc/udhcpd.conf -fS &
```

*<u>p.s. rtl_hostapd_2G.conf/rtl_hostapd_5G.conf 在 wifi 原厂提供的驱动中提供。</u>*



## 3. 常用的 wpa 指令

查询 wifi 状态：`wpa_cli -i wlan0 status`



## 4. wifi 和 eth0 共存设置

先配置 eth0

```sh
ifconfig eth0 hw ether 82:EF:8F:FF:87:CB
ifconfig eth0 192.168.147.12 netmask 255.255.255.0 up
route add -net 192.168.146.0 netmask 255.255.255.0 gw 192.168.147.254 dev eth0
```

然后连 wifi，运行 sta.sh 脚本



注意，两者都能连通，路由表应该是这样的：

```sh
~ # route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.17.141.254  0.0.0.0         UG    0      0        0 wlan0
172.17.141.0    0.0.0.0         255.255.255.0   U     0      0        0 wlan0
192.168.146.0   192.168.147.254 255.255.255.0   UG    0      0        0 eth0
192.168.147.0   0.0.0.0         255.255.255.0   U     0      0        0 eth0
```



## 5. 编译 wpa_supplicant

https://blog.csdn.net/Turix/article/details/112910483
