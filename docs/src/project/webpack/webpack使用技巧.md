# webpack 使用技巧

## 配置开发 config 和 生产 config

在开发模式和生产模式中，webpack 的配置会有所不同，比如在开发模式中，我们希望 webpack 能够使用 source-map 优化调试的体验，而在生产模式中，我们希望 webpack 能够将代码打包成一个一个的 bundle，并且能够压缩代码，提高代码的运行效率。因此，我们可以将 webpack 的配置分成开发配置和生产配置，然后在运行 webpack 时，根据不同的环境选择不同的配置。
我们可以先配置一个通用的 webpack 配置，然后在开发配置和生产配置中分别继承这个通用的配置，然后根据不同的环境选择不同的配置。

在 package.json 中配置 webpack 的命令

```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --config webpack.dev.js"
  }
}
```

配置一个通用的 webpack 配置

```js
// webpack.common.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // entry
  // output
  // module
  // plugins
};
```

### 开发配置

```js
// webpack.dev.js
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {},
});
```

`webpack-merge` 是一个用于合并 webpack 配置的库，我们可以使用它来合并开发配置和生产配置。

### 生产配置

```js
// webpack.prod.js
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",
  optimization: {
    splitChunks: {},
    runtimeChunk: {},
  },
});
```

## 获取 webpack 当前环境 - webpack.config.js

### NODE_ENV

在 webpack 的配置中，我们可以通过 `process.env.NODE_ENV` 来获取当前的环境，然后根据不同的环境选择不同的配置。
NODE_ENV 配置如下

```json
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --config webpack.prod.js",
  "dev": "cross-env NODE_ENV=development webpack serve --config webpack.dev.js"
}
```

::: tip 提示
需要先安装 cross-env 依赖。

```bash
npm install cross-env --save-dev
```

:::
cross-env 是一个用于跨平台设置环境变量的库，它可以兼容 Windows 和 Linux 等不同的操作系统。

根据当前环境判断使用 css-extract-plugin 还是 style-loader：

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const isProduction = process.env.NODE_ENV === "production";
const pluginArr = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];
function hasMiniCss() {
  // 根据当前环境判断是否使用 MiniCssExtractPlugin
  if (isProduction) {
    pluginArr.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      })
    );
  }
}
hasMiniCss();

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: pluginArr,
};
```

### --env

在 webpack 的命令行中，我们可以通过 `--env` 参数来传递环境变量。

```json
"scripts": {
  "build": "webpack --env production --config webpack.prod.js",
  "dev": "webpack serve --env development --config webpack.dev.js"
}
```

在 webpack.production.js 中，我们可以通过函数的方式接收到传递的环境变量：

```js
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (env) => {
  console.log(env); // { more:..., production: true }
  return merge(commonConfig(env), {
    mode: "production"
    devServer: {},
  });
};
```

## 获取 webpack 当前环境 - 业务代码

在业务代码中，我们获取环境需要注册 webpack.DefinePlugin 插件，将环境变量注入到全局变量中。

```js
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

在业务代码中，我们可以通过 `process.env.NODE_ENV` 来获取当前的环境。

## 分析打包结果

### `--json`

`--json` 是 webpack 的一个命令行参数，它可以生成一个 JSON 文件，例如：

```bash
webpack --json > stats.json
```

其中包含了 webpack 打包的结果。我们需要把它上传到 webpack analyse 网站中进行分析，不太方便。

### webpack-bundle-analyzer

webpack-bundle-analyzer 是一个用于分析 webpack 打包结果的插件，它可以本地开启服务，生成一个可视化的报告，显示各个模块的大小和依赖关系。

通常我们使用 `webpack-bundle-analyzer` 插件来分析打包结果。

```js
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

::: tip 提示
需要先安装 `webpack-bundle-analyzer` 依赖。

```bash
npm install webpack-bundle-analyzer --save-dev

```

:::

## dll 优化

webpack 的 dll 是一种优化打包速度的方式，它可以将一些不经常改变的库打包成一个 dll 文件，然后在每次打包的时候，只打包那些经常改变的文件。

我们需要在根目录创建一个 `webpack.dll.config.js` 文件，用于打包 dll 文件。

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendor: ["axios", "lodash"], // 需要打包的库
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].dll.js",
    library: "[name]_library", // 定位 dll 文件
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_library", // 和 output.library 对应
      path: path.resolve(__dirname, "dist/[name]-manifest.json"),
    }),
  ],
};
```

然后使用 `webpack --config webpack.dll.config.js` 命令来打包 dll 文件。

在实际的业务代码中，我们需要引入 dll 文件，并使用 `webpack.DllReferencePlugin` 插件来引用 dll 文件。

```js
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dist/vendor-manifest.json"),
    }),
  ],
};
```

::: tip 注意
vendor.dll.js 文件需要手动引入到 html 文件的模版中。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack</title>
  </head>
  <body>
    <script src="./vendor.dll.js"></script>
  </body>
</html>
```

:::

## tree-shaking

tree-shaking 是一种优化打包体积的方式，它可以在打包的时候，将那些没有被使用的代码删除。

tree-shaking 只能用于 ES6 模块，因为 ES6 模块是静态的，可以在编译的时候确定哪些代码被使用了。

在 webpack 中，我们可以通过配置 `optimization.usedExports` 来开启 tree-shaking。

```js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: [
      "./src/needReserve.js", // 需要保留的文件
    ],
  },
};
```

usedExports: true 表示开启 tree-shaking，sideEffects 表示需要保留的文件。webpack5 的生产模式默认开启了 tree-shaking。

[了解更多](https://webpack.docschina.org/guides/tree-shaking/)
