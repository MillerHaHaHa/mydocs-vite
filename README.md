# My Work Document

> 嵌入式开发工作笔记 — 基于 VitePress 构建的个人技术文档站点

## 简介

本项目是一个使用 [VitePress](https://vitepress.dev/) v2 构建的静态文档网站，用于记录嵌入式 Linux 开发工作中的技术笔记、调试经验和环境配置。内容主要围绕**国科微 (Goke)** 系列 SoC 平台的系统开发，以及嵌入式 Linux 通用技术栈和服务端运维知识。

站点自动部署到 **GitHub Pages**：[https://huangmingle.github.io/mydocs-vite/](https://huangmingle.github.io/mydocs-vite/)

## 技术栈

| 类别 | 技术 |
|---|---|
| 静态站点生成器 | VitePress v2 (alpha) |
| 运行时 | Node.js 22 |
| 内容格式 | Markdown |
| 配置语言 | TypeScript |
| CI/CD | GitHub Actions |
| 托管 | GitHub Pages |

## 目录结构

```
mydocs_vite/
├── .github/workflows/deploy.yml   # 自动构建与部署到 GitHub Pages
├── package.json                    # 项目依赖和 npm scripts
├── docs/                           # 文档源文件
│   ├── index.md                    # 首页
│   ├── .vitepress/
│   │   └── config.mts              # VitePress 站点配置（导航栏、侧边栏等）
│   ├── goke/                       # 国科微平台文档
│   │   ├── index.md
│   │   ├── common/                 # 通用文档（跨平台）
│   │   ├── v500/                   # V500 系列
│   │   ├── 7606v1/                 # 7606V1 系列
│   │   └── 7206v1/                 # 7206V1 系列
│   ├── technology/                 # 通用技术笔记
│   │   ├── embedded/               # 嵌入式开发
│   │   └── linux_server/           # Linux 服务端配置
│   └── trivia/                     # 杂项笔记
```

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### 安装

```bash
git clone https://github.com/huangmingle/mydocs-vite.git
cd mydocs_vite
npm install
```

### 本地开发

```bash
npm run docs:dev
```

启动后访问 `http://localhost:5173/mydocs-vite/` 即可实时预览。

### 构建

```bash
npm run docs:build      # 构建到 docs/.vitepress/dist/
npm run docs:preview    # 本地预览构建产物
```

## 自动化部署

向 `master` 分支推送代码后，GitHub Actions 会自动执行构建并将产物部署到 GitHub Pages。

工作流文件：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## 文档内容

### 国科微 (Goke) 平台

- **系统配置** — 内核配置修改、分区调整、内存/MMZ 调整、Flash 块大小调整、登录密码设置等
- **调试与工具** — Coredump 调试、PQ 调试、gperftools 性能分析、常用命令与脚本
- **外设与驱动** — UART、USB 网卡/WiFi、虚拟存储、PINMUX、开机 Logo 调试等
- **系统移植** — Ubuntu 22.04 移植、BlueZ 移植、Fast-Boot 驱动、TFTP 烧录
- **V500 系列** — fw_printenv、SDIO WiFi 驱动适配、Scan 移植、SPI DMA 配置
- **7606V1 系列** — Flash 分区调整

### 通用技术

- **嵌入式开发** — HT1621 LCD 驱动、OpenIPC 调试、树莓派配置、FrameBuffer/Camera 调试、AWS KVS WebRTC 移植、Mosquitto ARM 移植、TC 流量控制等
- **Linux 服务端** — bashrc 配置、NFS/Nginx/Samba 搭建、SSH 防暴力破解、Intel GPU + llama.cpp LLM 加速（含 Qwen 模型在 i5-13500H / i5-8600T 上的性能实测数据）

## License

MIT
