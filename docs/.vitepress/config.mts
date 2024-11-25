import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XWG 的学习笔记",
  description: "A notebook by XWG",
  base: "/NotePage/",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "前端基础",
        items: [
          { text: "HTML", link: "" },
          { text: "CSS", link: "" },
          { text: "JavaScript", link: "" },
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
          { text: "JavaScript", link: "" },
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
      "/advanced/ts/": [
        {
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
          items: [
            {
              text: "Webpack 必要配置",
              link: "/project/webpack/webpack必要配置.md",
            },
            {
              text: "Webpack Js配置",
              link: "/project/webpack/webpack_js配置.md",
            },
            {
              text: "Webpack ",
              link: "",
            },
            {
              text: "Webpack ",
              link: "",
            },
            {
              text: "Webpack ",
              link: "",
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
