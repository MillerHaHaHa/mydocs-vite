---
layout: home

hero:
  name: "Goke 开发文档"
  text: "国科微平台开发笔记"
  tagline: 记录 Goke 平台的开发、调试和配置经验
  actions:
    - theme: brand
      text: 通用文档
      link: /goke/common/板子配置
    - theme: alt
      text: V500 系列
      link: /goke/v500/快速修改内核配置
    - theme: alt
      text: 7206V1 系列
      link: /goke/7206v1/coredump调试

features:
  - title: 🛠 Common - 通用文档
    details: IPC 名词解释、coredump 调试方法、板子配置、板端常用命令、设置登录密码等通用开发文档。
    link: /goke/common/板子配置
    linkText: 浏览通用文档
  - title: 📡 V500 系列
    details: UART1 使用、fw_printfenv 配置、SDIO WiFi 驱动适配、快速修改内核配置、配置 USB 网卡、配置 USB 虚拟 U 盘等。
    link: /goke/v500/快速修改内核配置
    linkText: 浏览 V500 文档
  - title: 🔧 7206V1 系列
    details: 7206V1 平台的 coredump 调试方法及相关开发笔记。
    link: /goke/7206v1/coredump调试
    linkText: 浏览 7206V1 文档
---

## 📚 文档目录

### 🛠 Common - 通用

| 文档 | 说明 |
|------|------|
| [IPC 名词解释](./common/IPC名词.md) | IPC（Inter-Process Communication）相关术语和概念 |
| [coredump 调试](./common/coredump调试.md) | 通用的 coredump 调试方法和技巧 |
| [板子配置](./common/板子配置.md) | 开发板的通用配置说明 |
| [板端常用命令](./common/板端常用命令.md) | 开发板常用命令速查 |
| [设置登录密码](./common/设置登录密码.md) | 设置和修改板端登录密码 |

### 📡 V500 系列

| 文档 | 说明 |
|------|------|
| [快速修改内核配置](./v500/快速修改内核配置.md) | V500 平台内核配置的快速修改方法 |
| [UART1 的使用](./v500/UART1的使用.md) | V500 平台 UART1 串口的使用说明 |
| [fw_printenv 使用](./v500/fw_printfenv使用.md) | fw_printenv 环境变量工具的使用方法 |
| [SDIO WiFi 驱动适配](./v500/sdiowifi驱动适配.md) | V500 平台 SDIO WiFi 驱动的适配指南 |
| [配置 USB 网卡](./v500/配置USB网卡.md) | V500 平台 USB 网卡的配置方法 |
| [配置 USB 虚拟 U 盘](./v500/配置USB虚拟U盘.md) | V500 平台 USB 虚拟 U 盘的配置方法 |

### 🔧 7206V1 系列

| 文档 | 说明 |
|------|------|
| [coredump 调试](./7206v1/coredump调试.md) | 7206V1 平台的 coredump 调试方法 |
