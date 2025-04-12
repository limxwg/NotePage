# Promise 状态吸收

先看代码

```js
const p1 = Promise.resolve(1);

const p2 = new Promise((resolve) => {
  resolve(p1);
});

p1.then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3));

p2.then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6));
```

看起来，`p1` 是 fulfilled 完成状态，`p2` 接收到 `p1` 的 fulfilled 状态，也变成 fulfilled 状态。此时他们两个的 `then` 的回调函数就会放入微队列。
那么此时的顺序就是

```bash
微队列： 1 4
输出：
```

第一轮微队列执行完后，微队列中两个 Promise 的 `then` 的回调函数又会放入微队列。

```bash
微队列： 2 5
输出： 1 4
```

第二轮微队列执行完后，微队列中两个 Promise 的 `then` 的回调函数又会放入微队列。

```bash
微队列： 3 6
输出： 1 4 2 5
```

最终输出：

```bash
输出： 1 4 2 5 3 6
```

:::danger 实际上，上面的结果是错误的。
如果我们在 node 环境下运行，正确的结果是：

```bash
输出： 1 2 4 3 5 6
```

:::

为什么会出现这种情况？我们就需要来详细的了解一下 Promise 的状态吸收。

## Promise 状态吸收

在 Promises/A+ 规范文档的 [2.3.2](https://promisesaplus.com.cn/#point-49) 中说明了状态吸收。

> 简单来说，如果一个 Promise 的 `then` 方法里返回了一个新的 Promise 的话，这个 Promise 的状态会变成返回的那个新的 Promise 的状态。称为 Promise 状态吸收。

看起来，我们之前的理解跟这个规范文档的描述是相同的，为什么输出结果不一样呢？

因为 Promise 不会直接同步获取内部 Promise 的状态。在这篇[文章](https://mp.weixin.qq.com/s/HOI_PaJq38zQXV0pwW_HAQ)中我们可以看到，在 v8 源码中会调用`NewPromiseResolveThenableJobTask`方法，Promise 会创建额外微任务，把吸收状态这件事放到一个 `then` 方法的回调函数中去执行。

现在让我们来模拟一下这个过程。

首先，`p1` 是 fulfilled 状态，`p2` 中因为返回了一个新的 Promise，所以`p2` 是 pending 状态。此时`p2`触发状态吸收，把吸收状态这件事放到一个 `then` 方法中去执行，`then(吸收状态)`被放入微队列，然后`p1` 的 `then` 回调函数被放入微队列。

此时队列的顺序是：

```bash
微队列： then(状态吸收) 1
输出：
```

`then(状态吸收)`执行，因为 `状态吸收` 是放在 `then` 方法中的回调函数，所以 `状态吸收` 函数被放入微队列。`console.log(1)` 执行完后，它的 `then` 回调函数被放入微队列。

```bash
微队列： 状态吸收 2
输出： 1
```

`状态吸收` 执行，p2 的状态变成 `fulfilled`，`p2` 的 `then` 回调函数被放入微队列，`console.log(2)` 执行完后，它的 `then` 回调函数被放入微队列。

```bash
微队列： 4 3
输出： 1 2

```

分别执行`console.log(4)` 和 `console.log(3)`,并把 `console.log(5)` 和 `console.log(6)` 的 `then` 回调函数放入微队列。

```bash
微队列： 5
输出： 1 2 4 3

```

最后输出：

```bash
输出： 1 2 4 3 5 6

```

## 再看一个例子 🌰

```js
const p1 = Promise.resolve(2);

async function async1() {
  console.log(1);
  await async2();
  console.log("AAA");
}

async function async2() {
  return Promise.resolve(2);
}

async1();

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });
```

首先执行同步任务

```bash
输出： 1

```

执行 `await async2()`，`async2` 返回一个 Promise 触发状态吸收，`then(状态吸收)` 被放入微队列。`Promise.resolve()`的状态为 `fulfilled`，它的 `then` 回调函数被放入微队列。

```bash
微队列： then(状态吸收) 3
输出： 1

```

`then(状态吸收)` 执行，`状态吸收` 放入微队列，`console.log(3)` 执行完后，它的 `then` 回调函数被放入微队列。

```bash
微队列： 状态吸收 4
输出： 1 3

```

`状态吸收`执行后，`await async2()` 的状态变成 fulfilled，回调函数`AAA`被放入微队列。

```bash
微队列： 'AAA' 5
输出： 1 3 4

```

最后输出：

```bash
输出： 1 3 4 'AAA' 5

```

## 总结

当 Promise 中返回一个 Promise 的时候，外层的 Promise 的状态由内层返回的 Promise 状态确定，外层的 Promise 会触发状态吸收。吸收状态这件事会触发额外的微任务，并且被放到一个 `then` 方法的毁掉函数中去执行，相当于微队列会被推入两个微任务。

```bash
第一轮微队列： then(状态吸收)
第二轮微队列： 状态吸收

```

在状态吸收的微任务执行完后，外层 Promise 才会立刻修改状态，执行 `then` 方法，把回调函数放入微队列。
