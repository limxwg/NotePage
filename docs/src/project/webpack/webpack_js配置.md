# Webpack JS 配置

## babel-loader

babel-loader 是一个 webpack 的 loader，用于将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行。

例如，在文件中我们使用了 const 关键字，在旧版浏览器中是无法识别的，这时就需要使用 babel-loader 进行转换。又或者，我们使用了 async/await 关键字，在旧版浏览器中也是无法识别的，这时也需要使用 babel-loader 进行转换。
:::tip 提示
需要先安装 babel-loader 和 @babel/core 依赖。

```bash
pnpm install babel-loader @babel/core -D
```

:::

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
```

`test: /\.js$/` 匹配所有的 .js 文件。`exclude: /node_modules/` 排除 node_modules 目录下的文件。`loader: "babel-loader"` 使用 babel-loader 进行转换。

上述的情况只适用于简单的配置，如果需要进行复杂的配置，需要使用 use 属性进行配置。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"，"xxx-loader"],
      },
    ],
  },
};
```

这样我们就可以使用数组的方式来配置多个 loader。
::: tip 提示
loader 的执行顺序是从右到左的，也就是先执行 xxx-loader，再执行 babel-loader。
:::

这时我们执行 webpack，编译后的代码还是使用的 ES6+ 语法，因为转换为 ES5 有许多的规范，我们需要在 options 中进行配置，之后 babel-loader 才会根据配置进行转换。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browser: ["last 2 versions", "> 1%", "not ie <= 8"],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
```

presets 是用于配置 babel 的预设，将 ES6+ 代码转换为 ES5 代码。因为可以配置多个 presets，所以需要使用数组的形式进行配置。presets 的第一个参数是预设的名称，第二个参数是预设的配置。target 是用于配置目标环境，这里配置的是浏览器的版本，`last 2 versions` 是最新的两个版本，`> 1%` 是全球超过 1% 的浏览器，`not ie <= 8` 是排除 ie8 及以下的浏览器。

::: tip 提示
需要安装 @babel/preset-env 依赖。

```bash
pnpm install @babel/preset-env -D
```

:::
关于 @babel/preset-env 的配置直接放在在 webpack.config.js 文件中太臃肿了，我们可以在项目根目录配置一个 .babelrc 文件，将配置放在 .babelrc 文件中。

::: code-group

```js [webpack.config.js]
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
```

```json [.babelrc]
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browser": ["last 2 versions", "> 1%", "not ie <= 8"]
        }
      }
    ]
  ]
}
```

:::

## eslint-webpack-plugin

eslint-webpack-plugin 是一个 webpack 的插件，用于在 webpack 中使用 eslint 进行代码检查。
:::tip 提示
需要先安装 eslint 和 eslint-webpack-plugin 依赖。

```bash
pnpm install eslint eslint-webpack-plugin -D
```

:::

同配置 babel-loader 一样，我们也可以在 .eslintrc 文件中配置 eslint。
::: code-group

```json [.eslintrc]
{
  "env": {
    "browser": true, // 浏览器环境
    "es2020": true // es2020 环境
  },
  "parserOptions": {
    "sourceType": "module" // 模块化
  },
  "rules": {
    "semi": ["error", "always"], // 代码结尾是否加分号
    "quotes": ["error", "double"] // 是否使用双引号
  }
}
```

```js [webpack.config.js]
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  plugins: [
    new ESLintWebpackPlugin(), // 在.eslintrc 中配置 eslint
  ],
};
```

:::
在上面的 .eslintrc 文件中简单配置了 eslint 的环境，为浏览器环境，使用 es2020 的语法，模块化。同时配置了规则，代码结尾是否加分号，是否使用双引号。

在实际开发中我们通常会使用 eslint 的推荐配置，而不是自己一项一项进行配置，我们可以直接继承 eslint-config-standard 或者 eslint-config-airbnb 的配置，然后根据自己项目的需求调整。

```js
module.exports = {
  extends: ["standard", "plugin:vue/vue3-essential"],
};
```

上面的代码继承了 eslint-config-standard 和 eslint-plugin-vue 的配置，其中的 `plugin:vue/vue3-essential` 是常用的 vue3 的配置。
::: tip 提示
需要安装 eslint-config-standard 和 eslint-plugin-vue 依赖。

```bash
pnpm install eslint-config-standard eslint-plugin-vue -D
```

:::
