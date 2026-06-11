1. 安装
   ```
   sudo apt-get install samba
   sudo apt-get install samba-common-bin    #raspberry
   sudo apt-get install samba samba-common  #ubuntu
   ```
2. 编辑配置文件
   ```
   sudo nano /etc/samba/smb.conf
   ```
   ```
   #================Share Definitions
   read only = no //before is yes
   ```
   ```
   #==================Add =====================
   [MyShare]
   #share folder instructions
   comment = My Public Storage
   #share folder directory         
   path = /home/pi
   #share to other resources name
   browseable = yes
   #writable
   writable = yes
   #new file permissions 777
   create mask = 0777
   #new folder permissions 777
   directory mask = 0777
   #guest ask, no password
   guest ok = yes
   #users, ubuntu
   valid users = miller
   ```
   ```ubuntu
   [share]
   comment = share folder
   browseable = yes
   path = /home/miller
   create mask = 0777
   directory mask = 0777
   valid users = miller
   force user = miller
   force group = miller
   public = yes
   available = yes
   writable = yes
   ```
3. 添加用户
   ```
   sudo smbpasswd -a pi     #raspberry
   sudo smbpasswd -a miller #ubuntu
   ```
   > password 111
4. 启动服务
   ```
   #respberry
   sudo /etc/init.d/smbd restart
   sudo /etc/init.d/nmbd restart
   
   #ubuntu
   sudo service smbd restart
   ```
5. 配置权限
   ```
   sudo chmod -R 777 /home/pi      #raspberry
   sudo chmod -R 777 /home/miller  #ubuntu
   ```
6. 配置 PC 端
   
   运行组策略编辑器，命令行输入
   ```
   gpedit.msc
   ```
   
   计算机配置-管理模板-网络-Lanman 工作站-启用不安全的来宾登录
   
   双击，点击已启用，确定
7. 最后运行，命令行输入，IP 为树莓派 IP 地址
   ```
   \\IP\\MyShare
   \\192.168.0.109\MyShare
   ```

