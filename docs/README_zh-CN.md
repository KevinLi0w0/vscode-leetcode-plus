# LeetCode Plus

> 在 VS Code 中练习 LeetCode — 支持中英文切换与学习计划

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/main/resources/LeetCode.png" alt="">
</p>
<p align="center">
  <a href="https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/KevinLi0w0/vscode-leetcode-plus.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/KevinLi0w0/vscode-leetcode-plus/releases">
    <img src="https://img.shields.io/github/v/release/KevinLi0w0/vscode-leetcode-plus?style=flat-square" alt="">
  </a>
</p>

[English](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/README.md) | **中文文档**

## 关于本项目

本项目是 [vscode-leetcode](https://github.com/LeetCode-OpenSource/vscode-leetcode)（由 [LeetCode](https://github.com/LeetCode-OpenSource) 开发）的社区维护分支。

原仓库已超过 2 年未维护（最后活跃于 2023 年），大量 Issue 和 PR 无人处理。本分支在原项目基础上继续开发，旨在交付社区期待已久的功能：

- **中文语言支持** — 原插件仅支持英文，对中文用户不友好
- **学习计划集成** — 直接在侧边栏浏览并刷 leetcode.cn 上的精选学习计划（热题 100、高频 SQL 50）
- **更好的编辑器布局** — 题目预览在左，代码在右，无需来回切换标签页
- **Bug 修复** — 修复了原插件中注册按钮无论站点设置如何都会打开 leetcode.cn 的问题

## Plus 新增功能

### 1. 中英文界面切换

原插件仅支持英文，LeetCode Plus 新增了完整的中英文双语支持：

- **自动检测**：跟随 VS Code 显示语言
- **手动切换**：`Cmd+Shift+P` → `LeetCode: Switch UI Language`
- 或在设置中配置 `"leetcode.language": "zh-CN"`

### 2. 学习计划集成（leetcode.cn）

无需再从几百道题中手动翻找，直接在侧边栏浏览精选学习计划：

- **热题 100** — 100 道最高赞题目
- **高频 SQL 50** — 50 道高频 SQL 题目
- **自定义计划** — 通过 `"leetcode.studyPlans": ["your-plan-slug"]` 添加任意学习计划

### 3. 分屏编辑器布局

题目预览在左，代码编辑在右，不再来回切换标签页：

```json
"leetcode.enableSideMode": true,
"leetcode.editor.previewOnLeft": true
```

## ❗️ 注意 ❗️- 无法登录 LeetCode 节点的临时解决办法

> 注意：如果使用的是 `leetcode.cn` 账户，可以跳过此段落。

近期我们发现插件出现了[无法登录 leetcode.com 节点的问题](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478)。原因是因为近期 leetcode.com 改变了登录机制，目前我们暂时没有找到解决该问题的完美解决方案。

感谢 [@yihong0618](https://github.com/yihong0618) 提供了一个临时解决办法。现在你可以直接点击登录按钮并选择第三方登录或者 `Cookie` 登录。

> 注意：如果你希望使用第三方登录（**推荐**），请确保你的账户已经与第三方账户连接。如果你希望通过 `Cookie` 登录，请点击[该连接](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478#issuecomment-564757098)查看登录步骤。

## 运行条件

- [VS Code 1.23.0+](https://code.visualstudio.com/)
- [Node.js 10+](https://nodejs.org)
  > 注意：请确保`Node`在`PATH`环境变量中。您也可以通过设定 `leetcode.nodePath` 选项来指定 `Node.js` 可执行文件的路径。

## 快速开始

![demo](https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/gifs/demo.gif)

## 功能

### 登入登出

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/sign_in.png" alt="登入登出" />
</p>

- 点击 `LeetCode Explorer` 中的 `Sign in to LeetCode` 即可登入。

- 你也可以使用下来命令登入或利用 cookie 登入或登出:
  - **LeetCode: Sign in**
  - **LeetCode: Sign out**

---

### 切换 LeetCode 版本

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/endpoint.png" alt="切换 LeetCode 版本" />
</p>

- LeetCode 目前有**英文版**和**中文版**两种版本。点击 `LeetCode Explorer` 导航栏中的 ![btn_endpoint](https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/btn_endpoint.png) 按钮可切换版本。

- 目前可切换的版本有:

  - **leetcode.com**
  - **leetcode.cn**

  > 注意：两种版本的 LeetCode 账户并**不通用**，请确保当前激活的版本是正确的。插件默认激活的是**英文版**。

---

### 选择题目

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/pick_problem.png" alt="选择题目" />
</p>

- 直接点击题目或者在 `LeetCode Explorer` 中**右键**题目并选择 `Preview Problem` 可查看题目描述
- 选择 `Show Problem` 可直接进行答题。

  > 注意：你可以通过更新配置项 `leetcode.workspaceFolder` 来指定保存题目文件所用的工作区路径。默认工作区路径为：**$HOME/.leetcode/**。

  > 注意：你可以通过更新配置项 `leetcode.showCommentDescription` 来指定是否要在注释中包含题目描述。

  > 注意：你可以通过 `LeetCode: Switch Default Language` 命令变更答题时默认使用编程语言。

---

### 编辑器快捷方式

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/shortcuts.png" alt="Editor Shortcuts" />
</p>

- 插件会在编辑区域内支持五种不同的快捷方式（Code Lens）:

  - `Submit`: 提交你的答案至 LeetCode；
  - `Test`: 用给定的测试用例测试你的答案；
  - `Star`: 收藏或取消收藏该问题；
  - `Solution`: 显示该问题的高票解答；
  - `Description`: 显示该问题的题目描述。

  > 注意：你可以通过 `leetcode.editor.shortcuts` 配置项来定制需要激活的快捷方式。默认情况下只有 `Submit` 和 `Test` 会被激活。

---

### 通过关键字搜索题目

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/search.png" alt="通过关键字搜索题目" />
</p>

- 点击 `LeetCode Explorer` 导航栏中的 ![btn_search](https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/btn_search.png) 按钮可按照关键字搜索题目。

---

### 管理存档

<p align="center">
  <img src="https://raw.githubusercontent.com/LeetCode-OpenSource/vscode-leetcode/master/docs/imgs/session.png" alt="管理存档" />
</p>

- 点击位于 VS Code 底部状态栏的 `LeetCode: ***` 管理 `LeetCode 存档`。你可以**切换**存档或者**创建**，**删除**存档。

## 插件配置项

| 配置项名称                        | 描述                                                                                                                                                                                                                                                                                                          | 默认值             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `leetcode.hideSolved`             | 指定是否要隐藏已解决的问题                                                                                                                                                                                                                                                                                    | `false`            |
| `leetcode.defaultLanguage`        | 指定答题时使用的默认语言，可选语言有：`bash`, `c`, `cpp`, `csharp`, `golang`, `java`, `javascript`, `kotlin`, `mysql`, `php`, `python`,`python3`,`ruby`, `rust`, `scala`, `swift`, `typescript`                                                                                                               | `N/A`              |
| `leetcode.useWsl`                 | 指定是否启用 WSL                                                                                                                                                                                                                                                                                              | `false`            |
| `leetcode.endpoint`               | 指定使用的终端，可用终端有：`leetcode`, `leetcode-cn`                                                                                                                                                                                                                                                         | `leetcode`         |
| `leetcode.workspaceFolder`        | 指定保存文件的工作区目录                                                                                                                                                                                                                                                                                      | `""`               |
| `leetcode.filePath`               | 指定生成题目文件的相对文件夹路径名和文件名。点击查看[更多详细用法](https://github.com/LeetCode-OpenSource/vscode-leetcode/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A2%98%E7%9B%AE%E6%96%87%E4%BB%B6%E7%9A%84%E7%9B%B8%E5%AF%B9%E6%96%87%E4%BB%B6%E5%A4%B9%E8%B7%AF%E5%BE%84%E5%92%8C%E6%96%87%E4%BB%B6%E5%90%8D)。 |                    |
| `leetcode.enableStatusBar`        | 指定是否在 VS Code 下方显示插件状态栏。                                                                                                                                                                                                                                                                       | `true`             |
| `leetcode.editor.shortcuts`       | 指定在编辑器内所自定义的快捷方式。可用的快捷方式有: `submit`, `test`, `star`, `solution`, `description`。                                                                                                                                                                                                     | `["submit, test"]` |
| `leetcode.enableSideMode`         | 指定在解决一道题时，是否将`问题预览`、`高票答案`与`提交结果`窗口集中在编辑器的第二栏。                                                                                                                                                                                                                        | `true`             |
| `leetcode.nodePath`               | 指定 `Node.js` 可执行文件的路径。如：C:\Program Files\nodejs\node.exe                                                                                                                                                                                                                                         | `node`             |
| `leetcode.showCommentDescription` | 指定是否要在注释中显示题干。                                                                                                                                                                                                                                                                                  | `false`            |
| `leetcode.useEndpointTranslation` | 是否显示翻译版本内容。                                                                                                                                                                                                                                                                                        | `true`             |
| `leetcode.allowReportData`        | 为了更好的产品体验允许上报用户埋数据                                                                                                                                                                                                                                                                          | `true`             |

## 需要帮助？

在遇到任何问题时，欢迎[提交 Issue](https://github.com/KevinLi0w0/vscode-leetcode-plus/issues/new) 寻求帮助。

## 更新日志

请参考[更新日志](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/CHANGELOG.md)

## Plus 改动日志

### v0.19.0

基于 vscode-leetcode v0.18.4，做了以下改动：

**新功能：**
- 新增 i18n 国际化基础设施，支持中文（zh-CN）和英文（en）字符串表
- 新增 `leetcode.language` 设置（`auto` / `en` / `zh-CN`），自动检测 VS Code 显示语言
- 新增 `LeetCode: Switch UI Language` 命令，运行时快速切换语言
- 本地化所有主要 UI 字符串：侧边栏分类名、对话框按钮、进度提示、错误消息、登录提示等
- 在 LeetCode 侧边栏中新增"学习计划"分类（仅 leetcode.cn 站点）
  - 内置计划：热题 100（`top-100-liked`）和高频 SQL 50（`sql-free-50`）
  - 从学习计划页面获取题目 ID，网络失败时使用硬编码列表兜底
  - 新增 `leetcode.studyPlans` 设置，支持自定义学习计划 slug
- 新增 `leetcode.editor.previewOnLeft` 设置，题目预览在左、代码在右（默认：`true`）

**Bug 修复：**
- 修复已有 Bug：`promptForSignIn()` 无论站点设置如何，注册按钮总是打开 leetcode.cn
- 重构"隐藏已解决"过滤逻辑，从缓存层移到显示层 — 学习计划始终显示全部题目
- `DialogOptions` 改用 getter，语言切换后对话框按钮文字即时生效，无需重新加载窗口
- 学习计划端点检查移入 try/catch，切换站点时不再抛出未捕获异常

## 鸣谢

- 本插件基于[@skygragon](https://github.com/skygragon)的[leetcode-cli](https://github.com/skygragon/leetcode-cli)开源项目制作。
- 本项目是 [vscode-leetcode](https://github.com/LeetCode-OpenSource/vscode-leetcode)（由 LeetCode 开发）的社区维护分支，在原项目基础上 continued with new features。
- 特别鸣谢这些[贡献者们](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/ACKNOWLEDGEMENTS.md)。
