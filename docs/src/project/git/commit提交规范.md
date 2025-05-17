# Commit 提交规范

最近在做一个使用 Google Gemini API 对话的网页项目，但是在提交代码的时候，发现提交信息非常混乱，以至于要去查看分支才知道自己写了什么，于是就想着使用 Git Commit 规范来规范提交信息。于是就有了这篇文章。记录我踩过的一些坑，以及我的一些心得。

## 没有规矩不成方圆：为什么需要 Git Commit 规范？

就像我上面说的一样，提交的代码多了，提交信息就会非常混乱，以至于要去查看分支才知道自己写了什么。如果是一个团队，每个人都按自己的“心情”写 commit，那提交历史简直没法看！想象一下，当你要回溯某个功能或者修复 bug 时，面对一堆“update”、“fix”、“test”之类的提交信息，简直要抓狂 🤯！所以我们需要一个规范来规范提交信息。同时，规范的提交信息可以提供更多历史信息，方便快速浏览和过滤。

### Commit Message 的"骨骼结构"：Angular 规范了解一下？

业界比较流行的规范是 Angular 规范，很多工具也是基于这个规范的。 它就像写文章一样，有结构：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **Header:** **必需的**，就像文章的标题。
  - `<type>`: **必需的**，说明这次提交的类型，比如新功能 (feat)、修复 bug (fix)、文档 (docs) 等等。
    - feat: 新增功能 (feature)
    - fix: 修复 bug (bug fix)
    - docs: 文档变更 (documentation)
    - style: 代码格式或风格修改 (code style)
    - refactor: 重构 (refactor)
    - test: 测试相关 (testing)
    - chore: 构建过程或辅助工具的变动 (chore)
  - `<scope>`: 可选的，说明影响范围，比如哪个模块、哪个组件。
  - `<subject>`: **必需的**，简短描述提交目的，别超过 50 个字符，开头用动词，首字母小写，结尾别加句号。
- **Body:** 可选的，详细描述为啥要改，怎么改的，和以前有啥不同。
- **Footer:** 可选的，通常用来关联 Issue，或者标记不兼容的变动。

### 配置 Commitlint

类似于 `eslint`，`commitlint` 是一个用于检查提交信息的工具。它可以帮助我们确保提交信息符合规范，从而提高代码质量和可维护性。

其中 `@commitlint/config-conventional` 是基于 Conventional Commits 规范的配置，也就是我们前面说的 Angular 规范的变种。而 `@commitlint/cli` 是 `commitlint` 的命令行工具。用于在命令行中检查提交信息。例如：

```bash
npx commitlint --edit
```

#### 安装 Commitlint

```bash
pnpm install @commitlint/config-conventional @commitlint/cli --save-dev
```

#### 配置 Commitlint

在项目根目录创建 `package.json` 文件：

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

## 请出“门卫” 💂 来把关：Husky

光有规范还不行，必须在每个人进门的时候都进行安检。这时候 `husky` 就登场了！ 它就像一个 Git Hook 的管理器，能在 Git 生命周期的特定时机（比如提交前 `pre-commit`，提交信息前 `commit-msg`）执行一些脚本。

简单来说，就是你在提交代码前，`husky` 会帮你跑个检查，如果提交信息不符合规范，直接拒绝提交！ 这样就能从源头保证提交信息的质量。

### 配置 Husky

#### 安装 Husky

```bash
pnpm install husky --save-dev
```

#### 初始化 Husky

::: code-group

```bash [pnpm]
pnpm exec husky init
```

```bash [npm]
npx husky init
```

:::

这一步会在你的项目根目录创建一个 `.husky` 文件夹，文件夹中有一个 `pre-commit` 文件（关于这个 Hook 可以看[这里](#配置-pre-commit-钩子)），并在 `package.json` 里添加一个 `prepare` 脚本。

现在我们就配置好了 `husky`，只要在对应的文件中添加需要执行的脚本，就可以在 Hook 对应的时机执行脚本了。

常见的钩子有：

- `pre-commit`：在提交前执行的钩子。
- `commit-msg`：在提交信息写入前执行的钩子。
- `pre-push`：在 push 前执行的钩子。

### 配置 Husky 的 Hook

现在我们需要配置一个在提交信息写入前执行的钩子，来检查提交信息是否符合规范。所以需要添加 `commit-msg` 这个 Hook。

#### 添加 `commit-msg` Hook

在 `.husky` 目录下创建一个 `commit-msg` 文件，在里面添加我们要执行的脚本。

```bash
npx --no-install commitlint --edit "$1"
```

现在，我们在提交 commit 信息的时候，就会自动执行规范检查了。

如果我们提交一个不符合规范的 commit 信息，就会看到类似这样的提示：

```bash
PS C:\Users\admin\Desktop\aa>git commit -m '123'

⧗   input: 123
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

提示我们提交的 commit 信息 "123" 不符合规范，主要存在两个问题：

- 缺少提交主题（subject）
- 缺少提交类型（type）

这时候我们就可以根据提示，修改提交信息，直到符合规范为止。

例如把提交信息修改为：

```bash
git commit -m 'feat: 添加一个新功能'
```

这时候我们再提交，就会发现符合规范了。

现在我们有了"门卫"和"规章制度"，提交的时候如果不符合规范就会被拒绝。但每次都要手动输入符合规范的提交信息，还是有点麻烦。 这时候 `cz-git` 就来救场了！

## cz-git：提交信息的"智能助手" 🤖

`cz-git` 是一个 commitizen 的适配器，commitizen 是一个帮助你写符合规范提交信息的工具。 使用 `cz-git` 后，你不再需要手动敲命令写提交信息，而是通过交互式的方式，选择 type，填写 scope 和 subject 等等，就像填表格一样，非常方便！ 而且 `cz-git` 比其他适配器更强大，支持自定义，工程化，甚至可以集成 OpenAI 来帮你写提交信息 🚀 ！更加具体的信息可以参考 [cz-git 的文档](https://github.com/Zhengqbbb/cz-git)。

:::details 关于 commitizen 适配器
commitizen 可以使用 `git cz` 命令来代替 `git commit` 命令。

commitizen 适配器是 commitizen 的插件，用于将 commitizen 的命令行工具与 Git 的钩子结合起来。它提供了一种便捷的方式（通常为交互式）来填写提交信息，从而确保提交信息符合规范。

commitizen 的适配器还有很多，常见的有 `cz-conventional-changelog`、`git-cz` 等。
:::

### 配置 commitizen 和 cz-git

`cz-git`的配置也非常简单，只需要下载后在 `package.json` 中添加简单的配置即可。

#### 安装 commitizen 和 cz-git

```bash
pnpm install -g commitizen
pnpm install --save-dev cz-git
```

:::info 提示
`commitizen` 可以全局安装，也可以局部安装。全局安装可以让你在任何地方使用 `git cz` 命令，局部安装可以让你在项目中使用 `git cz` 命令。
:::

#### 配置 commitizen 使用 cz-git

在 `package.json` 中添加配置：

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "useEmoji": true // 是否使用 emoji
    }
  }
}
```

### 使用 cz-git 提交

现在，当我们修改完代码并 `git add .` 后，就可以使用 `git cz` 命令来代替 `git commit` 了！

```bash
git add .
git cz
```

然后，神奇的事情发生了！你不会再看到让你手动输入提交信息的界面，取而代之的是一个友好的交互式命令行，一步步引导你填写规范的提交信息。比如：
先让你选择提交类型 (type)。
再问你影响范围 (scope)。
然后让你填写简短的主题 (subject)。
接着问你是否需要详细的 Body。
最后问你是否需要 Footer。

填完所有信息，cz-git 会自动帮你生成一条漂亮的、符合规范的提交信息，比如：

```bash
chore: 🔨 引入commit格式化
```

是不是比手动输入方便多了？而且生成的提交信息格式统一，看着就舒服！😌

## 总结：告别“灵魂提交”，拥抱规范！🎉

通过引入 `husky`、`commitlint` 和 `cz-git`，我们可以轻松地在团队中推行 Git Commit 规范。 `husky` 负责在提交前执行检查，`commitlint` 负责检查提交信息是否符合规范，而 `cz-git` 则提供了一个便捷的交互式界面帮助我们生成规范的提交信息。

这样一来，我们的 Git 提交历史就会变得清晰明了，方便回溯和维护，也能提高团队协作效率。

赶紧在你的项目里试试吧！让你的 Git 提交记录不再"群魔乱舞"，而是整洁有序，赏心悦目！✨

### 常用的 Git Hook

除了之前提到的基础钩子外，还有一些其他常用的钩子：

- `post-commit`：在提交完成后执行的钩子，常用于发送通知或触发构建。
- `pre-push`：在推送到远程仓库前执行的钩子，可以用于运行测试或代码检查。
- `post-merge`：在合并完成后执行的钩子，常用于更新依赖或重新构建。
- `pre-rebase`：在变基操作前执行的钩子，可以防止在特定分支上进行变基。
- `post-checkout`：在切换分支后执行的钩子，常用于更新依赖或重新构建。
- `pre-merge-commit`：在合并提交前执行的钩子，可以用于检查合并冲突。
- `prepare-commit-msg`：在提交信息编辑器打开前执行的钩子，可以用于自动生成提交信息。
- `post-rewrite`：在重写提交历史后执行的钩子，常用于更新引用或触发构建。

### 钩子的执行顺序

Git 钩子的执行顺序如下：

1. `pre-commit`：提交前
2. `prepare-commit-msg`：准备提交信息
3. `commit-msg`：提交信息写入
4. `post-commit`：提交后
5. `pre-push`：推送前
6. `post-merge`：合并后
7. `pre-rebase`：变基前
8. `post-rewrite`：重写历史后

## 其他

### 配置 pre-commit 钩子

`pre-commit` 钩子是 Git 在提交前执行的钩子。一般和 `lint-staged` 一起使用，`lint-staged` 是一个用于在提交前执行 lint 的工具,它可以只检查暂存区的指定文件，而不是整个项目。这样就可以加快提交速度 🚀，避免不必要的 lint 检查。

#### 安装 lint-staged

```bash
pnpm install lint-staged --save-dev
```

#### 添加 pre-commit Hook

在 `.husky` 目录下创建一个 `pre-commit` 文件，在里面添加我们要执行的脚本。通常执行 `husky` 初始化后就已经创建好了。

#### 配置 pre-commit Hook

在 `pre-commit` 文件中添加我们要执行的脚本。例如：

```bash
npx --no-install lint-staged
```

在 `package.json` 中添加：

```json
"lint-staged": {
    "src/**/*.{js,vue,ts,tsx}": [
      "npm run lint"
    ]
  }
```

这样，在提交前就会执行 `lint-staged` 的检查了。
