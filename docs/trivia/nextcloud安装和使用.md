# nextcloud 安装和使用

配置文件：`nano /var/snap/nextcloud/current/nextcloud/config/config.php`

`trusted_domains` 添加 ip

---

新建用户：`nextcloud.manual-install admin 111`

sudo -u www-data php occ files:scan --all

snap set nextcloud ports.http=80

snap set nextcloud ports.https=8080

snap restart nextcloud

sudo nextcloud.occ user:resetpassword admin

sudo nextcloud.occ files:scan --all

nextcloud.occ user:list

<br/>

https://blog.csdn.net/y17685207389/article/details/123411991

https://www.jianshu.com/p/5adb37efd478

<br/>

nohup python3 -u Nextcloud_AutoScan.py > Nextcloud_AutoScan.log 2>&1 &

<br/>

无法扫描外部存储

snap connect nextcloud:removable-media
