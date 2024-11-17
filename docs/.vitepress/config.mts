import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/NotePage/",
  title: "My Awesome Project",
  description: "A VitePress Site",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Examples", link: "/markdown-examples" },
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
          { text: "TypeScript", link: "" },
          { text: "Vue", link: "" },
          { text: "React", link: "" },
        ],
      },
      {
        text: "源码学习",
        items: [
          { text: "Vue", link: "" },
          { text: "React", link: "" },
        ],
      },
      {
        text: "前端工程化",
        items: [
          {
            text: "Webpack 5",
            link: "/project/webpack/00_关于webpack.md",
          },
          { text: "Vite", link: "" },
          { text: "JavaScript", link: "" },
        ],
      },
      {
        text: "后端",
        items: [
          { text: "Node", link: "" },
          { text: "Koa", link: "" },
          { text: "SQL", link: "" },
        ],
      },
      {
        text: "其他",
        items: [
          { text: "VitePress", link: "" },
          { text: "Linux", link: "" },
        ],
      },
    ],

    sidebar: {
      "/project/webpack/": [
        {
          text: "介绍",
          items: [
            {
              text: "关于 Webpack",
              link: "/project/webpack/00_关于webpack.md",
            },
            {
              text: "使用 Webpack",
              link: "/project/webpack/01_使用webpack.md",
            },
            {
              text: "webpack.config.js",
              link: "/project/webpack/02_webpack_config.md",
            },
          ],
        },
        {
          text: "配置 webpack",
          items: [
            {
              text: "Webpack",
              link: "",
            },
            {
              text: "Webpack",
              link: "",
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
