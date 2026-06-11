# nginx 安装和使用

[菜鸟教程nginx](https://www.runoob.com/linux/nginx-install-setup.html)

安装 pcrev

wget https://sourceforge.net/projects/pcre/files/pcre/8.45/pcre-8.45.tar.gz

./configure

make && make install

pcre-config --version

安装 nginx

[nginx官网](https://nginx.org/en/download.html)

wget http://nginx.org/download/nginx-1.22.1.tar.gz

./configure --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.45

make

make install

在 /usr/local/bin 下创建软链接

```json
nginx -v
nginx -t 检查配置文件正确性
nginx 开启服务
nginx -s reload 重载配置文件
nginx -s reopen 重启 nginx
nginx -s stop 停止 nginx
```

[文件服务器](https://www.jianshu.com/p/806a7def3982)

[配置密码](https://www.cnblogs.com/zou-rong/p/16058736.html)
