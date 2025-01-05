# webpack 开发模式

webpack 开发模式是利用 webpack-dev-server， 一个基于 Express 的本地开发服务器，它使用 webpack-dev-middleware 来为 webpack 打包生成的资源文件提供 Web 服务。

## 配置开发模式

在根目录下创建 myDev.js 文件，内容如下：

```js
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config); // 和bash中执行 webpack --config webpack.config.js 一样
```

::: tip 提示
需要先安装 webpack-dev-middleware 依赖。

```bash
npm install webpack-dev-middleware --save-dev
```

:::

在 webpack.config.js 中配置 webpack-dev-server，如下：

```js
module.exports = {
  // ...
  devServer: {
    port: 9000, // 设置端口号
    hot: true, // 启用 webpack 的模块热替换特性
    proxy: [
      // 设置代理
      {
        context: "/api",
        target: "http://localhost:1234",
      },
    ],
  },
};
```

这样，就可以在本地启动一个开发服务器 🖥️，访问 `http://localhost:9000` 就可以看到打包后的页面。

## 热更新

热更新是 webpack-dev-server 的一个重要特性，它可以在不刷新页面的情况下，将修改后的模块替换到运行中的模块，同时保持页面的状态。

强制更新会自动刷新整个页面，重置整个应用的状态。

在修改 js 代码后，不会进行热更新，会进行强制更新，如果要热更新，需要在 js 代码中添加一段代码，如下：

```js
if (module.hot) {
  module.hot.accept();
}
```

这样修改 js 代码后，页面就会进行热更新，不会进行强制更新。

## proxy 代理

如果在项目中直接访问 api 接口，会因为跨域问题导致请求失败，这时候就可以使用 proxy 代理来解决跨域问题。
例如，我们现在需要访问 `http://localhost:1234/api/user`，但是我们的项目是运行在 `http://localhost:9000` 的，这时候就可以使用 proxy 代理来解决跨域问题，如下：

```js
module.exports = {
  // ...
  devServer: {
    port: 9000, // 设置端口号
    hot: true, // 启用 webpack 的模块热替换特性
    proxy: [
      // 设置代理
      {
        context: "/api",
        target: "http://localhost:1234",
      },
    ],
  },
};
```

context 表示需要代理的路径，target 表示代理的目标地址。
这样就可以在项目中访问 `http://localhost:9000/api/user`，实际上访问的是 `http://localhost:1234/api/user`。

## source-map

在 webpack 打包后，代码会被压缩，不利于调试，这时候就可以使用 source-map 来解决这个问题。source-map 是 webpack 中的一个配置项，它可以帮助我们调试代码，找到代码在源文件中的位置。
source-map 有多种类型，常用的有以下几种：

- eval-source-map：使用 eval 执行模块代码，并且生成 source-map，但是 source-map 会包含在打包后的代码中，可能会导致打包后的代码体积过大。
- inline-source-map：使用 eval 执行模块代码，并且生成 source-map，source-map 会以 base64 的形式嵌入到打包后的代码中，不会导致打包后的代码体积过大。
- cheap-source-map：生成 source-map，但是不会包含列信息，只会包含行信息，可能会导致调试时无法准确定位到具体的代码行。
- cheap-module-source-map：生成 source-map，并且会包含模块的路径信息，不会包含列信息，只会包含行信息，可能会导致调试时无法准确定位到具体的代码行。

[更多配置](https://webpack.docschina.org/configuration/devtool/#devtool)

在 webpack.config.js 中配置 source-map，如下：

```js
module.exports = {
  // ...
  devtool: "eval-source-map", // 设置 source-map 类型
};
```

这样就可以在开发模式下使用 source-map 来调试代码了。
