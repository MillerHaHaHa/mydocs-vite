# ubuntu20.04 net-tools

vb 虚拟机中添加 host-only 网卡

启动网卡 `sudo ifconfig enp0s8 up`

配置静态地址 `sudo nano /etc/netplan/00-installer-config.yaml`

```
# This is the network config written by 'subiquity'
network:
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      dhcp4: false
      addresses: [192.168.56.106/24]
  version: 2
```

应用网络配置 `sudo netplan apply`

# Debian network-interfaces

修改网卡配置文件 `nano /etc/network/interfaces`

```
auto enp0s3
allow-hotplug enp0s3
iface enp0s3 inet dhcp

auto enp0s8
allow-hotplug enp0s8
iface enp0s8 inet static
address 192.168.56.106
```

重启网卡服务 `systemctl restart networking.service`