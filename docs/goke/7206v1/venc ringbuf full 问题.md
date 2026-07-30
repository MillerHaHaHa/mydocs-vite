# 编码遇到 ring buf full 的问题

![ringbuf full 错误日志](/mydocs-vite/image/venc-ringbuf-full错误.png)

## 原因

VPSS 处理速度太快，而 VENC 编码速度跟不上，导致 VPSS 的数据堆积，最终触发 ring buffer full。

## 解决方案

1. **加大 venc 通道的卷绕 wrap buffer 大小**， 比如从 0.5 个 vb 增加到 1 个 vb

2. **检查卷绕那路编码通道的优先级配置**，确保编码通道能够获得足够的调度资源

3. **降低 VPSS 工作频率**，减缓 VPSS 的输出速度，使其与 VENC 的处理能力匹配：

   ```bash
   echo "263000" > /sys/devices/viproc/devfreq/viproc/userspace/set_freq
   ```

   ![VPSS 降频调节](/mydocs-vite/image/vpss降频调节.png)

   > **注意**：VENC 的默认工作频率已经是最大值，无法再提升，因此只能从 VPSS 侧进行降频调节。
