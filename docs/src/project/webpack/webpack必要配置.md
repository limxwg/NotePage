# webpack 必要配置

## mode

```js
module.exports = {
  mode: "development", // 开发模式
};
```

设置构建模式，可以是 'development' 或 'production'。这个配置会影响 Webpack 的内置优化和代码输出。使用不同的模式可以优化构建过程，在 development 模式下，Webpack 打包后的代码会显示许多关于构建的信息，方便调试；在 production 模式下，Webpack 会进行代码压缩和优化，提高打包后的代码性能。

## entry

```js
module.exports = {
  entry: "./src/index.js", // 入口文件
};
```

这是 Webpack 的入口文件，Webpack 会从这个文件开始解析依赖关系，构建出最终的打包文件。入口文件可以是单个文件，也可以是多个文件，多个文件时可以使用对象的形式。

```js
module.exports = {
  entry: {
    main: "./src/index.js",
    sub: "./src/sub.js",
  },
};
```

通过对象的形式，可以同时构建多个入口文件，每个入口文件都会生成一个对应的打包文件。

## output

```js
module.exports = {
  output: {
    filename: "bundle.js", // 输出文件名
    path: __dirname + "/dist", // 输出文件路径
  },
};
```

output 配置了 Webpack 打包后的文件输出路径和文件名等信息。

### filename

filename 是输出文件的文件名。可以通过占位符来指定不同的文件名，例如：

```js
module.exports = {
  output: {
    filename: "[name].[chunkhash:4].bundle.js", // 输出文件名
    path: __dirname + "/dist", // 输出文件路径
  },
};
```

- name 是入口文件名。
- chunkhash 是一个占位符，表示根据文件内容生成的哈希值，可以用于缓存优化。
- fullhash 是一个占位符，表示根据整个项目内容生成的哈希值，可以用于缓存优化。
- bundle 是固定的字符串，表示打包文件。

::: tip 提示
`[chunkhash:4]` 表示只取哈希值的 4 位，可以根据需要调整。
:::

### path

path 是输出文件的路径。通常采用 `__dirname` 表示当前文件所在的目录，然后拼接上输出文件的路径 `/dist`。

为了处理路径拼接问题，可以使用 `path` 模块来处理路径：

```js
const path = require("path");

module.exports = {
  output: {
    filename: "[name].[chunkhash:4].bundle.js", // 输出文件名
    path: path.resolve(__dirname, "dist"), // 输出文件路径
  },
};
```
