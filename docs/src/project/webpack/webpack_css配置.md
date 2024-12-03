# webpack CSS 配置

在 webpack 中，只能处理 JavaScript 文件，如果直接引入 css 文件，webpack 是无法识别的，所以我们需要通过 css-loader 来识别 CSS 文件。

识别 css 后有两种方法来处理 css 文件

- style-loader：将 css 文件插入到 html 文件中
- mini-css-extract-plugin：将 css 文件提取出来，生成一个 css 文件

## style-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

:::tip 提示
需要先安装 css-loader 和 style-loader 依赖。

```bash
pnpm install css-loader style-loader -D
```

:::
在 use 中，loader 的执行顺序是从右到左，也就是先执行 css-loader 识别 css 文件，再执行 style-loader。

这样我们就可以在打包文件中看到 css 文件被插入到 html 文件中。

## mini-css-extract-plugin

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ],
};
```

:::tip 提示
需要先安装 mini-css-extract-plugin 依赖。

```bash
pnpm install mini-css-extract-plugin -D
```

:::

这样我们就可以在打包文件中看到 css 文件被提取出来，生成一个 css 文件。 其中的 filename 是生成的 css 文件的路径和文件名。代表着在 dist 目录下的 css 文件夹中，文件名为 `[name].[contenthash].css` 的文件。其中 `[name]` 是入口文件的名字，`[contenthash]` 是文件内容的 hash 值。

对于 less 和 sass 文件，我们可以先使用 less-loader 和 sass-loader 来识别，然后再使用 css-loader 和 style-loader 或 mini-css-extract-plugin 来处理。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ],
};
```

:::tip 提示
需要先安装 less-loader 和 less 依赖。 less 是核心库，less-loader 是 webpack 的 loader。

```bash
pnpm install less-loader less -D
```

:::

## css 压缩

在开发环境中，我们不需要压缩 css 文件，但是在生产环境中，我们需要压缩 css 文件，以减少文件大小，提高加载速度。

我们可以使用 css-minimizer-webpack-plugin 来压缩 css 文件。

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new CssMinimizerPlugin(),
  ],
};
```

:::tip 提示
需要先安装 css-minimizer-webpack-plugin 依赖。

```bash
pnpm install css-minimizer-webpack-plugin -D
```

:::

## 其他资源文件处理

### 图片处理

在 webpack5 之前，我们可以使用 file-loader 或 url-loader 来处理图片文件。webpack5 之后，我们可以使用内置的 loader 来处理图片文件。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被转为base64
          },
        },
        generator: {
          filename: "img/[name].[contenthash][ext]",
        },
      },
    ],
  },
};
```

asset 会根据文件大小自动选择使用 base64 或者生成单独的文件

- 如果文件小于 maxSize，那么将会被转为 base64
- 如果文件大于 maxSize，那么将会生成单独的文件

filename 是生成的图片文件的路径和文件名。代表着在 dist 目录下的 img 文件夹中，文件名为 `[name].[contenthash][ext]` 的文件。其中 `[name]` 是文件的名字，`[contenthash]` 是文件内容的 hash 值，`[ext]` 是文件的扩展名。

## 其他

loader 的实现是一个函数，函数接收一个参数，这个参数是一个 string，表示要处理的文件的内容。函数需要返回一个 string，表示处理后的文件的内容。

我们可以尝试创建自己的 loader，在 webpack.config.js 同文件目录下新建一个 loader 文件夹，在 loader 文件夹中新建一个 my-css-loader.js 文件，内容如下：

```js
function myCssLoader(source) {
  console.log(source);
  return cssContent.replace("0", "1px");
  return source;
}
```

这个 loader 会将 css 文件中的 0 替换为 1px。

在 webpack.config.js 中配置 loader：

```js
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "./loader/my-css-loader",
        ],
      },
    ],
  },
  plugins: [new miniCssExtractPlugin()],
};
```

这样我们就可以在打包文件中看到 css 文件中的 0 被替换为 1px 了。
