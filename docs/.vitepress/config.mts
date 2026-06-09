import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Work Document",
  description: "A VitePress Site",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Goke', link: '/goke/index' },
      { text: 'Linux', link: '/linux/index' },
      { text: 'Examples', link: '/markdown-examples' }
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
          text: 'Common - 通用',
          collapsed: false,
          items: [
            { text: 'IPC 名词解释', link: '/goke/common/IPC名词' },
            { text: 'coredump 调试', link: '/goke/common/coredump调试' },
            { text: '板子配置', link: '/goke/common/板子配置' },
            { text: '板端常用命令', link: '/goke/common/板端常用命令' },
            { text: '设置登录密码', link: '/goke/common/设置登录密码' },
          ]
        },
        {
          text: 'V500 系列',
          collapsed: false,
          items: [
            { text: '快速修改内核配置', link: '/goke/v500/快速修改内核配置' },
            { text: 'UART1 的使用', link: '/goke/v500/UART1的使用' },
            { text: 'fw_printenv 使用', link: '/goke/v500/fw_printfenv使用' },
            { text: 'SDIO WiFi 驱动适配', link: '/goke/v500/sdiowifi驱动适配' },
            { text: '配置 USB 网卡', link: '/goke/v500/配置USB网卡' },
            { text: '配置 USB 虚拟 U 盘', link: '/goke/v500/配置USB虚拟U盘' },
          ]
        },
        {
          text: '7206V1 系列',
          collapsed: false,
          items: [
            { text: 'coredump 调试', link: '/goke/7206v1/coredump调试' },
          ]
        },
      ],
      '/linux/': [
        {
          text: 'Linux 开发笔记',
          items: [
            { text: '总览', link: '/linux/index' },
          ]
        },
        {
          text: 'Shell 配置',
          collapsed: false,
          items: [
            { text: '常用 bashrc 配置', link: '/linux/linux开发常用bashrc配置' },
          ]
        },
      ],
      '/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
