---
layout: home

hero:
  name: "Goke 开发文档"
  text: "国科微平台开发笔记"
  tagline: 记录 Goke 平台的开发、调试和配置经验
  actions:
    - theme: brand
      text: 通用文档
      link: /goke/common/常用命令与脚本
    - theme: alt
      text: V500 系列
      link: /goke/v500/sdiowifi驱动适配
    - theme: alt
      text: 7606V1 系列
      link: /goke/7606v1/7606v1调整flash分区

features:
  - title: 🛠 Common - 通用文档
    details: 系统配置（内核配置、分区、内存、FLASH）、调试工具（coredump、PQ、gperftools）、外设驱动（UART、USB、WiFi）等通用开发文档。
    link: /goke/common/常用命令与脚本
    linkText: 浏览通用文档
  - title: 📡 V500 系列
    details: fw_printenv 环境变量、SDIO WiFi 驱动适配、scan 移植、SPI DMA 配置等 V500 平台笔记。
    link: /goke/v500/sdiowifi驱动适配
    linkText: 浏览 V500 文档
  - title: 🔧 7606V1 系列
    details: 7606V1 平台的 Flash 分区调整及相关开发笔记。
    link: /goke/7606v1/7606v1调整flash分区
    linkText: 浏览 7606V1 文档
---

## 📚 文档目录

### 🛠 Common - 系统配置

| 文档 | 说明 |
|------|------|
| [快速修改内核配置](./common/快速修改内核配置.md) | 内核配置的快速修改方法 |
| [文件系统分区参考](./common/文件系统分区参考.md) | 文件系统分区方案参考 |
| [去掉 bootargs 分区](./common/去掉bootargs分区.md) | 移除 bootargs 分区的操作指南 |
| [调整内存和 MMZ 分配](./common/调整内存和MMZ分配.md) | 调整内存与 MMZ 区域大小 |
| [flash 块大小调整](./common/flash块大小调整.md) | Flash 块大小的修改方法 |
| [设置登录密码](./common/设置登录密码.md) | 设置和修改板端登录密码 |

### 🔍 Common - 调试与工具

| 文档 | 说明 |
|------|------|
| [coredump 调试](./common/coredump调试.md) | 通用的 coredump 调试方法和技巧 |
| [PQ 调试笔记](./common/PQ调试笔记.md) | 图像质量 PQ 调试记录 |
| [gperftools 使用](./common/gperftools使用.md) | gperftools 性能分析工具的使用 |
| [oneed_cgi 调试](./common/oneed_cgi调试.md) | oneed CGI 相关调试笔记 |
| [常用开发工具](./common/常用开发工具.md) | 开发过程中常用的工具汇总 |
| [常用命令与脚本](./common/常用命令与脚本.md) | 开发板常用命令与脚本速查 |

### 🔌 Common - 外设与驱动

| 文档 | 说明 |
|------|------|
| [UART1 的使用](./common/UART1的使用.md) | UART1 串口的使用说明 |
| [配置 USB 网卡](./common/配置USB网卡.md) | USB 网卡的配置方法 |
| [配置 USB 虚拟 U 盘](./common/配置USB虚拟U盘.md) | USB 虚拟 U 盘的配置方法 |
| [WiFi 常规配置](./common/wifi常规配置.md) | WiFi 的常规配置说明 |
| [ffmpeg 常用命令](./common/ffmpeg常用命令.md) | ffmpeg 多媒体处理常用命令 |
| [启越调屏 PINMUX](./common/启越调屏PINMUX.md) | 启越屏幕 PINMUX 配置 |
| [开机画面调试](./common/开机画面调试.md) | 开机画面/启动 Logo 调试 |

### 📦 Common - 系统移植

| 文档 | 说明 |
|------|------|
| [Ubuntu 高版本移植笔记](./common/ubuntu高版本移植笔记.md) | Ubuntu 22.04/24.04 系统移植记录 |
| [BlueZ 移植](./common/bluez移植.md) | BlueZ 蓝牙协议栈的移植 |
| [快启 buildin 版本新增驱动](./common/快启buildin版本新增驱动.md) | 快启版本中添加内置驱动 |
| [TFTP 烧录](./common/tftp烧录.md) | 通过 TFTP 进行固件烧录 |

### 📋 Common - 其他

| 文档 | 说明 |
|------|------|
| [IPC 常用名词](./common/IPC常用名词.md) | IPC（Inter-Process Communication）相关术语和概念 |

### 📡 V500 系列

| 文档 | 说明 |
|------|------|
| [fw_printenv 使用](./v500/fw_printfenv使用.md) | fw_printenv 环境变量工具的使用方法 |
| [SDIO WiFi 驱动适配](./v500/sdiowifi驱动适配.md) | V500 平台 SDIO WiFi 驱动的适配指南 |
| [scan 移植笔记](./v500/scan移植笔记.md) | scan 相关功能的移植记录 |
| [V500 开启 SPI DMA 配置](./v500/v500开启spi%20dma配置.md) | V500 平台 SPI DMA 的开启配置 |

### 🔧 7606V1 系列

| 文档 | 说明 |
|------|------|
| [7606V1 调整 Flash 分区](./7606v1/7606v1调整flash分区.md) | 7606V1 平台的 Flash 分区调整方法 |
