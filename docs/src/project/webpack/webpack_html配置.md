# webpack HTML 配置

对于一个通常在浏览器环境下运行的 vue 项目，需要通过 html 文件来引入打包后的 js 文件和 css 文件，获取样式和功能。同时，由于前面的 output 配置，文件在修改后会更新打包文件文件名的 hash 值，显然直接在 html 文件中引入的 js 和 css 文件路径会导致错误 🚫。

因此，我们需要在 webpack 中配置 html 文件模版，使其能够正确引入打包后的文件。

## html-webpack-plugin

`html-webpack-plugin` 是一个 webpack 插件，用于简化 html 文件的创建。它将自动注入 webpack 打包后的 js 和 css 文件，并生成一个 html 文件。由于 webpack 并不需要识别 html 文件，因此 `html-webpack-plugin` 是一个插件，而不是 loader。

需要在 src 目录下创建一个 index.html 文件，作为模版文件。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模版文件路径
      filename: "index.html", // 生成的文件名
      inject: "body", // js 文件注入位置 body 中注入
      minify: {
        // 压缩配置
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
  ],
};
```

:::tip 注意
需要先安装 html-webpack-plugin 依赖。

```bash
npm install html-webpack-plugin -D
```

:::
