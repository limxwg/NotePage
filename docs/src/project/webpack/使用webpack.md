# 使用 Webpack

## 安装 Webpack

在安装 Webpack 之前，请确保已安装了 Node.js。Webpack 是一个 Node.js 模块，因此需要 Node.js 环境来运行。

### 1. 初始化项目

创建一个项目文件夹，然后使用 npm 初始化项目。

```bash
pnpm init
```

### 2. 安装 Webpack

```bash
pnpm i webpack webpack-cli -D
```

webpack 从 4.0 版本开始，在安装 `webpack` 时，就必须要安装 `webpack-cli`。

`webpack` 是打包代码时依赖的核心内容，而 `webpack-cli` 是一个用来在命令行中运行 webpack 的工具。

::: tip 提示
笔记使用的 `webpack` 版本为 `webpack@5.96.1`
:::

## 配置 Webpack

### 1.创建 webpack.config.js 文件

在项目根目录下创建一个 `webpack.config.js` 文件，并配置如下内容：

```js
const path = require("path");

module.exports = {
  mode: "development", // 选择开发模式
  entry: "./src/index.js", // 应用程序的入口文件
  output: {
    filename: "bundle.js", // 输出文件的名称
    path: path.resolve(__dirname, "dist"), // 输出文件的目录
  },
};
```

### 2.配置 package.json 文件

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

## 运行 Webpack

```bash
pnpm run build
```

在 `./dist` 文件夹下就会生成 `bundle.js` 文件，这个文件就是我们打包后的文件。
