import { defineConfig } from "vitepress";

export default defineConfig({
  // 站点名称
  title: "向师傅的笔记",
  titleTemplate: "BLOG",
  lang: "zh-CN",
  // 部署的基础路径
  base: "/",
  // 生成html的head配置：站点favicon...
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/toux.jpg" }],
  ],
  // 打包目录
  dest: "./dist",
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
  },
  themeConfig: {
    logo: "/toux.jpg",
    // 头部导航
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "分类",
        items: [
          { text: "js", link: "/js_md/" },
          { text: "ts", link: "/ts_md/typescript-basic" },
          { text: "vue", link: "/vue_md/vue2" },
          { text: "react", link: "/react_md/" },
          { text: "包管理必用插件", link: "/npm_md/" },
          { text: "node", link: "/node_md/" },
          { text: "其它链接", link: "/interview/" }, // 外部链接
        ],
      },
    ],
    // 侧边导航
    /*
     * 侧边导航有两种写法， 对象或者数组，
     **/
    sidebar: {
      "/vue_md/": [
        // vue
        {
          text: "vue",
          collapsed: true,
          collapsible: true,
          items: [
            {
              text: "vue_basic",
              link: "/vue_md/vue2",
            },
            {
              text: "vue进阶",
              link: "/vue_md/",
            },
          ],
        },
      ],
      "/ts_md/":[
        {
          text: "typescript",
          collapsed: true,
          collapsible: true,
          items: [
            {
              text: "基础",
              link: "/ts_md/typescript-basic",
            },
            {
              text: "进阶",
              link: "/ts_md/object-oriented",
            },
            {
              text: "个人心得",
              link: "/ts_md/",
            }
          ],
        },
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xlc4560/study_note" }],
    // 页脚配置
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },

    // 搜索框配置
    // algolia: {
    //   appId: "8J64VVRP8K",
    //   apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
    //   indexName: "vitepress",
    // },

    carbonAds: {
      code: "CEBDT27Y",
      placement: "vuejsorg",
    },
  },
});
