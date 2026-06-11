1. 先用 SDCardFormatterv5 格式化 SD 卡

2. 打开 win32diskimager-v0.9-binary 中的 Win32DiskImager.exe

3. 选择镜像，选择 device，点击 Write

4. 等待 Write 成功

5. 复制 wpa_supplicant.conf 和 ssh 到 SD 卡根目录 boot

6. SD 卡插到树莓派

7. 用 ssh 登录树莓派

   > 默认 ssh 账号 pi 密码 raspberry
   >
   > miller 树莓派 ip 地址 192.168.0.169

8. 创建 pi 用户新密码

   > passwd
   >
   > 账号 pi 密码 940913a
   >
   > 或者 Lelee123a940913

9. 设置 root 密码

   > sudo passwd root 
   >
   > 账号 root 密码 940808a
   >
   > 或者 Lelee123a940808

10. 安装虚拟桌面

   > sudo apt-get install tightvncserver
   >
   > tightvncserver :1
   >
   > password: 940913a

11. 启动 vnc 桌面

    ```
    sudo raspi-config
    选 Interfacing Options
    选 vnc
    选 yes
    ```

