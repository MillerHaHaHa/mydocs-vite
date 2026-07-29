import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mydocs-vite/',
  title: "My Work Document",
  description: "A VitePress Site",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Goke', link: '/goke/index' },
      { text: 'Technology', link: '/technology/index' },
      { text: 'Trivia', link: '/trivia/index' }
    ],

    sidebar: {
      '/goke/': [
        {
          text: 'Goke 开发文档',
          items: [
            { text: '总览', link: '/goke/index' },
          ]
        },
        {
          text: 'Common - 系统配置',
          collapsed: true,
          items: [
            { text: '快速修改内核配置', link: '/goke/common/快速修改内核配置' },
            { text: '文件系统分区参考', link: '/goke/common/文件系统分区参考' },
            { text: '去掉 bootargs 分区', link: '/goke/common/去掉bootargs分区' },
            { text: '调整内存和 MMZ 分配', link: '/goke/common/调整内存和MMZ分配' },
            { text: 'flash 块大小调整', link: '/goke/common/flash块大小调整' },
            { text: '设置登录密码', link: '/goke/common/设置登录密码' },
          ]
        },
        {
          text: 'Common - 调试与工具',
          collapsed: true,
          items: [
            { text: 'coredump 调试', link: '/goke/common/coredump调试' },
            { text: 'PQ 调试笔记', link: '/goke/common/PQ调试笔记' },
            { text: 'gperftools 使用', link: '/goke/common/gperftools使用' },
            { text: 'oneed_cgi 调试', link: '/goke/common/oneed_cgi调试' },
            { text: '常用开发工具', link: '/goke/common/常用开发工具' },
            { text: '常用命令与脚本', link: '/goke/common/常用命令与脚本' },
          ]
        },
        {
          text: 'Common - 外设与驱动',
          collapsed: true,
          items: [
            { text: 'UART1 的使用', link: '/goke/common/UART1的使用' },
            { text: '配置 USB 网卡', link: '/goke/common/配置USB网卡' },
            { text: '配置 USB 虚拟 U 盘', link: '/goke/common/配置USB虚拟U盘' },
            { text: 'WiFi 常规配置', link: '/goke/common/wifi常规配置' },
            { text: 'RTL8189 调试笔记', link: '/goke/common/rtl8189调试笔记' },
            { text: '编译 wpa_supplicant 和 hostapd', link: '/goke/common/编译wpa_supplicant和hostapd' },
            { text: 'ffmpeg 常用命令', link: '/goke/common/ffmpeg常用命令' },
            { text: '启越调屏 PINMUX', link: '/goke/common/启越调屏PINMUX' },
            { text: '开机画面调试', link: '/goke/common/开机画面调试' },
          ]
        },
        {
          text: 'Common - 系统移植',
          collapsed: true,
          items: [
            { text: 'Ubuntu 高版本移植笔记', link: '/goke/common/ubuntu高版本移植笔记' },
            { text: 'BlueZ 移植', link: '/goke/common/bluez移植' },
            { text: '快启 buildin 版本新增驱动', link: '/goke/common/快启buildin版本新增驱动' },
            { text: 'TFTP 烧录', link: '/goke/common/tftp烧录' },
          ]
        },
        {
          text: 'Common - 其他',
          collapsed: true,
          items: [
            { text: 'IPC 常用名词', link: '/goke/common/IPC常用名词' },
          ]
        },
        {
          text: 'V500 系列',
          collapsed: true,
          items: [
            { text: 'fw_printenv 使用', link: '/goke/v500/fw_printfenv使用' },
            { text: 'SDIO WiFi 驱动适配', link: '/goke/v500/sdiowifi驱动适配' },
            { text: 'scan 移植笔记', link: '/goke/v500/scan移植笔记' },
            { text: 'V500 开启 SPI DMA 配置', link: '/goke/v500/v500开启spi dma配置' },
          ]
        },
        {
          text: '7606V1 系列',
          collapsed: true,
          items: [
            { text: '7606V1 调整 Flash 分区', link: '/goke/7606v1/7606v1调整flash分区' },
          ]
        },
        {
          text: '7206V1 系列',
          collapsed: true,
          items: [
            { text: 'VENC Ringbuf Full 问题', link: '/goke/7206v1/venc ringbuf full 问题' },
          ]
        },
      ],
      '/technology/': [
        {
          text: '技术笔记',
          items: [
            { text: '总览', link: '/technology/index' },
          ]
        },
        {
          text: 'Embedded - 嵌入式开发',
          collapsed: false,
          items: [
            { text: 'HT1621 断码屏协议', link: '/technology/embedded/HT1621断码屏协议' },
            { text: 'OpenIPC 调试笔记', link: '/technology/embedded/OpenIPC调试笔记' },
            { text: 'RaspberryPi - 安装系统和启动', link: '/technology/embedded/RaspberryPi-安装系统和启动' },
            { text: 'RaspberryPi - 调试 framebuffer', link: '/technology/embedded/RaspberryPi-调试framebuffer' },
            { text: 'RaspberryPi - 调试摄像头', link: '/technology/embedded/RaspberryPi-调试摄像头' },
            { text: 'AWS KVS WebRTC 移植', link: '/technology/embedded/aws kvs webrtc移植' },
            { text: 'Mosquitto ARM 移植', link: '/technology/embedded/mosquitto arm移植' },
            { text: 'TC 流控', link: '/technology/embedded/tc流控' },
          ]
        },
        {
          text: 'Linux Server - 服务器配置',
          collapsed: false,
          items: [
            { text: '常用 bashrc 配置', link: '/technology/linux_server/Linux服务器常用bashrc配置' },
            { text: 'NFS 安装和使用', link: '/technology/linux_server/nfs安装和使用' },
            { text: 'Nginx 安装和使用', link: '/technology/linux_server/nginx安装和使用' },
            { text: '安装 Samba 服务', link: '/technology/linux_server/安装samba服务' },
            { text: '双网卡配置 Samba', link: '/technology/linux_server/双网卡配置samba' },
            { text: 'SSH 防暴力破解', link: '/technology/linux_server/ssh多次登录失败加入黑名单' },
            { text: 'Intel GPU 加速 LLM', link: '/technology/linux_server/IntelGPU加速LLM' },
          ]
        },
      ],
      '/trivia/': [
        {
          text: '杂谈笔记',
          items: [
            { text: '总览', link: '/trivia/index' },
          ]
        },
        {
          text: '系统管理',
          collapsed: false,
          items: [
            { text: 'Windows 激活', link: '/trivia/windows激活' },
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
