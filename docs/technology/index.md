---
layout: home

hero:
  name: "技术笔记"
  text: "嵌入式开发与 Linux 服务器"
  tagline: 记录嵌入式开发、Linux 服务器配置等各类技术笔记
  actions:
    - theme: brand
      text: 嵌入式开发
      link: /technology/embedded/OpenIPC调试笔记
    - theme: alt
      text: Linux 服务器
      link: /technology/linux_server/Linux服务器常用bashrc配置

features:
  - title: 🔌 嵌入式开发
    details: RaspberryPi 系列笔记、OpenIPC 调试、HT1621 断码屏协议、AWS KVS WebRTC 移植、Mosquitto 移植、TC 流控等嵌入式相关笔记。
    link: /technology/embedded/OpenIPC调试笔记
    linkText: 浏览嵌入式笔记
  - title: 🖥 Linux 服务器
    details: bashrc 环境配置、NFS/Nginx/Samba 服务搭建、SSH 防暴力破解、Intel GPU 加速 LLM 等服务器运维配置笔记。
    link: /technology/linux_server/Linux服务器常用bashrc配置
    linkText: 浏览服务器笔记
---

## 📚 文档目录

### 🔌 Embedded - 嵌入式开发

| 文档 | 说明 |
|------|------|
| [HT1621 断码屏协议](./embedded/HT1621断码屏协议.md) | HT1621 断码屏驱动协议解析 |
| [OpenIPC 调试笔记](./embedded/OpenIPC调试笔记.md) | OpenIPC 开源 IPC 固件的调试记录 |
| [RaspberryPi - 安装系统和启动](./embedded/RaspberryPi-安装系统和启动.md) | 树莓派系统安装与首次启动 |
| [RaspberryPi - 调试 framebuffer](./embedded/RaspberryPi-调试framebuffer.md) | 树莓派 framebuffer 调试笔记 |
| [RaspberryPi - 调试摄像头](./embedded/RaspberryPi-调试摄像头.md) | 树莓派摄像头调试记录 |
| [AWS KVS WebRTC 移植](./embedded/aws%20kvs%20webrtc移植.md) | AWS KVS WebRTC 在嵌入式平台的移植 |
| [Mosquitto ARM 移植](./embedded/mosquitto%20arm移植.md) | Mosquitto MQTT Broker 的 ARM 平台移植 |
| [TC 流控](./embedded/tc流控.md) | Linux TC 流量控制的配置与使用 |

### 🖥 Linux Server - 服务器配置

| 文档 | 说明 |
|------|------|
| [常用 bashrc 配置](./linux_server/Linux服务器常用bashrc配置.md) | Linux 服务器常用的 bashrc 环境配置 |
| [NFS 安装和使用](./linux_server/nfs安装和使用.md) | NFS 网络文件系统的安装、配置与挂载 |
| [Nginx 安装和使用](./linux_server/nginx安装和使用.md) | Nginx Web 服务器的安装、配置与反向代理 |
| [安装 Samba 服务](./linux_server/安装samba服务.md) | Samba 文件共享服务的安装与配置 |
| [双网卡配置 Samba](./linux_server/双网卡配置samba.md) | 双网卡环境下 Samba 的配置方法 |
| [SSH 防暴力破解](./linux_server/ssh多次登录失败加入黑名单.md) | 防止 SSH 暴力破解，自动封禁失败 IP |
| [Intel GPU 加速 LLM](./linux_server/IntelGPU加速LLM.md) | 使用 Intel GPU 加速大语言模型推理 |
