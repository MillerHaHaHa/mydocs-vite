# nfs 安装和使用

固定端口

`vim /etc/default/nfs-kernel-server`

```
RPCMOUNTDOPTS="--manage-gids --port <mountd_port_number>"
RPCNLOCKDOPTS="--port <nlockmgr_port_number>"
RPCRQUOTADOPTS="--port <rquotad_port_number>"
```

`systemctl restart nfs-kernel-server`

查看 rpc 端口情况

`rpcinfo -p`

防火墙，nlockmgr 端口根据实际情况，mountd 端口使用上面固定的

> TCP/UDP 端口 2049：
这是 NFS 服务器上的主要端口，用于 NFS 数据传输和挂载。
> 
> UDP 端口 111：
这是 RPC (Remote Procedure Call) 绑定端口，NFS 使用它来注册 RPC 服务。
> 
> UDP 端口 32765 至 32768：
这是 NFS 的动态端口范围，用于一些辅助协议，如 NFS 锁管理（nlockmgr）和远程配额（rquotad）

```
sudo ufw allow 2049/tcp
sudo ufw allow 2049/udp
sudo ufw allow 111/udp
sudo ufw allow 32765:32768/udp
sudo ufw reload
```

挂载

```
sudo mount -t nfs -o nolock 192.168.0.111:/mnt/sdc1/work/project/rp /mnt/nfs
```

卸载

```
sudo umount /mnt/nfs
```