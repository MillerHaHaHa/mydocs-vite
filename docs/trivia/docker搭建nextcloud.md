# docker 搭建 nextcloud

官网配置文件

```
https://github.com/nextcloud/docker
记得将 volume 的路径前面都要加 ./
```

拷贝配置文件出来

```
docker cp nextcloud_app_1:/var/www/html/config/config.php var/www/html/config/
```

拷贝配置文件到容器

```
docker cp var/www/html/config/config.php nextcloud_app_1:/var/www/html/config
```

设置权限

```
docker-compose exec app chown -R www-data:www-data /var/www/html/config
```

重启容器

```
docker-compose restart
```

进入容器终端

```
docker exec -u 33 -it 56ee69cfd89b /bin/bash
```

使用 occ

```
php occ
```

执行 cron.php

```
docker exec -u www-data nextcloud_app_1 php cron.php
```

添加到定时任务

```
crontab -e
*/5 * * * * docker exec -u www-data nextcloud_app_1 php cron.php
```

参考链接

https://github.com/nextcloud/docker

https://www.bilibili.com/read/cv25645178/

