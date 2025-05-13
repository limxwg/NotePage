import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XWG 的学习笔记",
  description: "A notebook by XWG",
  base: "/",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "前端基础",
        items: [
          { text: "HTML", link: "" },
          { text: "CSS", link: "" },
          { text: "JavaScript", link: "/base/js/无限滚动/index.md" },
        ],
      },
      {
        text: "前端进阶",
        items: [
          {
            text: "TypeScript",
            link: "/advanced/ts/类型系统.md",
          },
          { text: "Vue", link: "" },
          { text: "React", link: "" },
        ],
      },
      /* {
        text: "源码学习",
        items: [
          { text: "Vue", link: "" },
          { text: "React", link: "" },
        ],
      }, */
      {
        text: "前端工程化",
        items: [
          {
            text: "Webpack 5",
            link: "/project/webpack/关于webpack.md",
        },
        { text: "Vite", link: "" },
        { text: "Git", link: "/project/git/commit提交规范.md" },
      ],
    },
      /* {
        text: "后端",
        items: [
          { text: "Node", link: "" },
          { text: "Koa", link: "" },
          { text: "SQL", link: "" },
        ],
      }, */
      /* {
        text: "其他",
        items: [
          { text: "VitePress", link: "" },
          { text: "Linux", link: "" },
        ],
      }, */
    ],

    sidebar: {
      "/base/js/": [
        {
          text: "笔记",
          collapsed: false,
          items: [
            {
              text: "Promise",
              collapsed: false,
              items: [
                {
                  text: "Promise 状态吸收",
                  link: "/base/js/Promise状态吸收.md",
                },
              ],
            },
          ],
        },
        {
          text: "案例",
          collapsed: false,
          items: [
            {
              text: "无限滚动",
              link: "/base/js/无限滚动/index.md",
            },
            {
              text: "任务队列",
              link: "/base/js/任务队列.md",
            },
          ],
        },
      ],
      "/advanced/ts/": [
        {
          text: "笔记",
          collapsed: false,
          items: [
            {
              text: "类型系统",
              link: "/advanced/ts/类型系统.md",
            },
            {
              text: "条件类型",
              link: "/advanced/ts/条件类型.md",
            },
            {
              text: "类型守卫",
              link: "/advanced/ts/类型守卫.md",
            },
          ],
        },
        {
          text: "案例",
          collapsed: false,
          items: [],
        },
      ],
      "/project/webpack/": [
        {
          text: "介绍",
          collapsed: false,
          items: [
            {
              text: "关于 Webpack",
              link: "/project/webpack/关于webpack.md",
            },
            {
              text: "使用 Webpack",
              link: "/project/webpack/使用webpack.md",
            },
            {
              text: "webpack.config.js",
              link: "/project/webpack/webpack_config.md",
            },
          ],
        },
        {
          text: "配置 Webpack",
          collapsed: false,
          items: [
            {
              text: "必要配置",
              link: "/project/webpack/webpack必要配置.md",
            },
            {
              text: "JS 配置",
              link: "/project/webpack/webpack_js配置.md",
            },
            {
              text: "CSS 配置 ",
              link: "/project/webpack/webpack_css配置.md",
            },
            {
              text: "TS 配置",
              link: "/project/webpack/webpack_ts配置.md",
            },
            {
              text: "HTML 配置",
              link: "/project/webpack/webpack_html配置.md",
            },
            {
              text: "代码分割",
              link: "/project/webpack/webpack代码分割.md",
            },
            {
              text: "开发模式",
              link: "/project/webpack/webpack开发模式.md",
            },
            {
              text: "使用技巧",
              link: "/project/webpack/webpack使用技巧.md",
            },
          ],
        },
      ],
      "/project/git/": [
        {
          text: "案例",
          collapsed: false,
          items: [
            {
              text: "commit 提交规范",
              link: "/project/git/commit提交规范.md",
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    lastUpdated: {
      text: "最后更新于",
    },
    search: {
      provider: "local",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      label: "页面导航",
      level: [2, 3],
    },
  },
});
