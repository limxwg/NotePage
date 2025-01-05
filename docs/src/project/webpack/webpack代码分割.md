# webpack 代码分割

在单入口文件中，webpack 会将所有的模块打包成一个文件，这会导致文件体积过大，加载时间过长。为了解决这个问题，webpack 提供了代码分割的功能，可以将代码分割成多个文件，从而实现按需加载，加快首屏的加载速度。

## 单入口异步加载

异步加载是指将代码分割成多个文件，并在需要时才加载这些文件。

现在有需要加载的文件 `./my-module.js`，我们希望在使用时才加载它。

```js
const a = 1;
export default a;
```

webpack 提供了两种方式来实现异步加载：

### `import()` 加载

使用 `import()` 函数来动态加载模块。例如：

```js
import(/* webpackChunkName: "my-chunk" */ "./my-module").then((module) => {
  // 使用加载的模块
  console.log(module); // 输出文件内容
  console.log(module.default); // 输出默认导出 1
});
```

`/* webpackChunkName: "my-chunk" */` 是 webpack 提供的注释语法，用于指定生成的文件名。在打包后，分割出来的文件名会以 `my-chunk` 开头。

### `require.ensure()` 加载

使用 `require.ensure()` 函数来动态加载模块。例如：

```js
require.ensure(
  ["jquery"],
  ($) => {
    const module = require("./my-module");
    // 使用加载的模块
    console.log(module); // 输出文件内容
    console.log(module.default); // 输出默认导出 1
  },
  "my-chunk"
);
```

`require.ensure()` 函数接受三个参数：

1. `dependencies`：依赖的模块数组，当这些模块加载完成后，才会执行回调函数。如果设置为`['jquery']`，则表示依赖 `jquery` 模块。在 `callback` 就可以使用 `jquery` 模块了。
2. `callback`：回调函数，当依赖的模块加载完成后，会执行这个函数。
3. `chunkName`：生成的文件名，用于指定生成的文件名。

## 多入口分割代码

如果代码有多个入口文件，每个文件都使用了相同的模块，那么这些模块会被重复打包到每个文件中，导致文件体积过大。
例如：

```js
// common.js
export const a = 1;

// entry1.js
import { a } from "./common.js";
console.log(a);

// entry2.js
import { a } from "./common.js";
console.log(a);
```

在打包后，`common.js` 模块会被重复打包到 `entry1.js` 和 `entry2.js` 中，导致文件体积过大。为了解决这个问题，我们可以把这些公共模块提取出来，单独打包成一个文件，利用浏览器的缓存，在减小文件体积的同时，避免重复加载。

### `optimization.splitChunks` 分割

使用 `optimization.splitChunks` 配置项来分割代码。例如：

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块进行分割，同时还可以选择 "initial"（只对同步模块进行分割）和 "async"（只对异步模块进行分割）
      minChunks: 2, // 分割出来的文件的最小引用次数
      minSize: 3000, // 分割出来的文件的最小大小，单位为字节
      cacheGroups: {
        vendors: {
          // 分割第三方库
          filename: "vendors.js",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        common: {
          // 分割业务公共模块
          filename: "common.js",
          minChunks: 2,
          priority: -20, // 优先级，数值越大，优先级越高
          reuseExistingChunk: true, // 如果当前模块已经被分割过，则复用已经分割的模块
        },
      },
    },
  },
};
```

## 运行时代码分割

运行时代码分割是指将 webpack 的运行时代码单独打包成一个文件，从而避免在每次打包时都重新生成运行时代码。

```js
modules.exports = {
  optimization: {
    runtimeChunk: {
      name: "runtime.js",
    },
  },
};
```
