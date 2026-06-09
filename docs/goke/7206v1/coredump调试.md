## kernel 5.10

1. 内核配置
   ```
   CONFIG_COREDUMP=y
   CONFIG_ALLOW_DEV_COREDUMP=y
   CONFIG_ELF_CORE=y
   ```
2. 板端配置
   ```
   mount -t tmpfs tmpfs /tmp
   echo "/tmp/core-%e-%p-%t" > /proc/sys/kernel/core_pattern
   ulimit -c unlimited
   ```
   
   <br/>

## 可能遇到的问题

### 1. 无法输出到 /tmp 下

需要挂载 mem `mount -t tmpfs tmpfs /tmp`

### 2. 没有调试信息

不要 strip
