# webpack TS 配置

配置 webpack 的 ts 配置，和 css 的配置相似，都是通过配置 loader 来识别文件，然后进行相应的处理。

## ts-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
};
```

:::tip 提示
需要先安装 ts-laoder 和 typescript 依赖。

```bash
pnpm instal了 ts-loader typescript -D
```

:::

对于 ts 的配置，需要新建一个 tsconfig.json 文件，然后配置 ts 的编译选项。
