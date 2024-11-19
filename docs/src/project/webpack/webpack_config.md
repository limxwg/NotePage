# webpack.config.js

```js
const path = require("path");

modules.exports = {
  mode: "development",
  devtool: "",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {},
  plugins: [],
  resolve: {},
  optimization: {},
  devServer: {},
};
```

webpack.config.js 是 Webpack 的核心配置文件，它定义了如何打包应用程序的资源。其中`mode`,`entry`,`output` 为必填项,以下是该配置文件中常用的参数及其用途：

## mode

用途：设置构建模式，可以是 `development`、`production` 或 `none`。影响优化和代码输出等。

```js
// ./src/index.js

console.log("webpack");
```

使用不同构建模式生成的 bundle.js 代码如下：
::: code-group

```js [production]
console.log("webpack");
```

```js[development]
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ () => {
        eval(
          'console.log("webpack");\r\n\n\n//# sourceURL=webpack://zz/./src/index.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = {};
  /******/ __webpack_modules__["./src/index.js"]();
  /******/
  /******/
})();
```

:::

## devtool

用途：设置源映射（source maps）的类型，用于调试，为了准确定位代码的位置，在 `mode:development` 使用。

不设置 `devtool: "source-map"`,代码在打包后会被压缩，无法准确定位代码的位置。

## entry

[官方文档](https://webpack.docschina.org/concepts/entry-points)

用途：指定应用程序的入口点。Webpack 从这些入口点开始构建依赖图，并打包所有依赖项。`entry` 提供多种方式来定义入口点，包括字符串、数组、对象等。

### `entry` 的简写

```js
module.exports = {
  entry: "./src/index.js",
};
```

### `entry` 的字符串语法

```js
module.exports = {
  entry: {
    index: "./src/index.js",
  },
};
```

### `entry` 的对象语法

```js
module.exports = {
  entry: {
    index: "./src/index.js",
  },
};
```

对象语法允许你为多个入口点指定不同的配置，例如：

```js
module.exports = {
  entry: {
    main: "./src/main.js",
    index: "./src/index.js",
  },
};
```

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

## output

[官方文档](https://webpack.docschina.org/configuration/output/#template-strings)

用途：定义输出的 bundle 文件的配置，包括文件名、输出目录等。

```js
module.exports = {
  output: {
    /**
     * 出口文件名
     * name entry的名字
     * chunkhash 只有修改过的某个模块，才会重新生成 hash
     * fullhash 只要修改过其中一个模块，所有模块都会重新生成 hash
     * :4 hash保留4位
     */
    filename: "[name].[chunkhash:4].[fullhash:4].bundle.js",
    /**
     * 出口文件路径
     * __dirname 当前文件所在目录
     */
    path: path.resolve(__dirname, "dist"),
    /** 配置 cdn 地址用于 html 引入 */
    // publicPath:'www.xxx.com'
  },
};
```

## module

用途：定义加载器（loaders），用于处理项目中的不同类型文件。

**以添加 `bebal-loader` 为例：**

`bebal-loader` 是一个 Babel 加载器，用于将 ES6+ 代码转换为向后兼容的 JavaScript 代码，以便在旧版浏览器中运行。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

## plugins

用途：添加插件（plugins），用于执行范围更广的自定义操作，如环境变量注入、代码分割等。

**以使用 index.html 模版为例：**

使用 index.html 模版，可以自动将打包后的 JavaScript 文件引入到 HTML 文件中。

:::tip 提示
需要安装 `html-webpack-plugin`。
:::

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

HTML 文件模版

```html
<!-- ./src/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body></body>
</html>
```

## resolve

用途：配置解析模块的方式，包括扩展名、别名等。

```js
module.exports = {
  resolve: {
    /**
     * 配置模块解析的扩展名
     * 在引入模块时，可以省略扩展名
     */
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
    /**
     * 配置模块解析的别名
     * 在引入模块时，可以使用别名代替路径
     */
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
```

```js
// 省略扩展名前缀
import { add } from "./src/utils.ts"; // [!code --]
import { add } from "./src/utils"; // [!code ++]

// 配置别名
import { add } from "./src/utils"; // [!code --]
import { add } from "@/utils"; // [!code ++]
```

## optimization

用途：设置性能优化选项，如代码分割、压缩等。

```js
module.exports = {
  optimization: {
    /** 代码分割 */
    splitChunks: {
      chunks: "all",
    },
  },
};
```

## devServer

用途：配置 Webpack Dev Server，一个小型的 Node.js 服务器，用于开发过程中提供实时重新加载功能。

:::tip 提示
需要安装 `webpack-dev-server`。
:::

```js
module.exports = {
  devServer: {
    port: 8080, // 设置端口号
    open: true, // 自动打开浏览器
    hot: true, // 启用热模块替换
  },
};
```
