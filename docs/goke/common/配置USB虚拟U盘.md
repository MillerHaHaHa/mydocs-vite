# 配置 USB 虚拟 U 盘

1. 按照文档《外围设备驱动 操作指南》2.2.3 图 2-2，2-3，2-6 修改内核配置
2. 打开内核配置宏 `CONFIG_BLK_DEV_LOOP`
3. 重新编译和烧录 kernel
4. 上电后执行命令，创建内存虚拟节点：
   ```powershell
   dd if=/dev/zero of=/dev/test bs=1M count=2
   mkfs.vfat /dev/test
   ```
5. 按照文档 2.3.5 操作，执行以下命令：
   
   ko 直接编译进内核，可以跳过 insmod 步骤
   
   `Config_Storage.sh` 脚本在 `sdk/tools/utils/usb_tools` 下
   ```
   export VID="0x0525"
   export PID="0xa4a5"
   export MANUFACTURER="XMEDIA"
   export PRODUCT="MassStorage"
   export SERIALNUMBER="1234567890"
   export MEMORY=/dev/test
   ./Config_Storage.sh
   ```
6. 将单板和 PC 相连，即可在 PC 端看到 U 盘设备
7. 如果要在板端查看盘符内容，在单板上 `mount -t vfat /dev/test /mnt`
