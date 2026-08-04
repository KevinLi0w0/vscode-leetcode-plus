# LeetCode Plus

> Solve LeetCode problems in VS Code — with i18n (Chinese/English) and Study Plan support

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

**English** | [中文文档](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/docs/README_zh-CN.md)

## About This Project

This project is a community-maintained fork of [vscode-leetcode](https://github.com/LeetCode-OpenSource/vscode-leetcode) by [LeetCode](https://github.com/LeetCode-OpenSource).

The original repository has been unmaintained for over 2 years (last active in 2023), with many open issues and PRs left unaddressed. This fork was created to continue development and deliver features that the community has been requesting:

- **Chinese language support** — the original extension is English-only, making it difficult for Chinese-speaking users
- **Study plan integration** — directly browse and solve curated problem lists (Hot 100, SQL 50) from leetcode.cn
- **Better editor layout** — split view with preview on left, code on right
- **Bug fixes** — including a pre-existing bug where Sign Up always opened leetcode.cn regardless of endpoint

## What's New in Plus

### 1. i18n — Chinese/English UI Switching

The original extension is English-only. LeetCode Plus adds full bilingual support:

- **Auto-detect**: follows your VS Code display language
- **Manual toggle**: `Cmd+Shift+P` → `LeetCode: Switch UI Language`
- or set `"leetcode.language": "zh-CN"` in settings

### 2. Study Plan Integration (leetcode.cn)

No more digging through hundreds of problems. Browse curated study plans directly in the explorer:

- **Hot 100** — 100 most-liked problems
- **SQL 50** — 50 high-frequency SQL problems
- **Custom plans** — add any plan slug via `"leetcode.studyPlans": ["your-plan-slug"]`

### 3. Split Editor Layout

Preview on the left, code on the right — no more tab switching:

```json
"leetcode.enableSideMode": true,
"leetcode.editor.previewOnLeft": true
```

## ❗️ Attention ❗️- Workaround to login to LeetCode endpoint

> Note: If you are using `leetcode.cn`, you can just ignore this section.

Recently we observed that [the extension cannot login to leetcode.com endpoint anymore](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478). The root cause of this issue is that leetcode.com changed its login mechanism and so far there is no ideal way to fix that issue.

Thanks for [@yihong0618](https://github.com/yihong0618) provided a workaround which can somehow mitigate this. Now you can simply click the `Sign In` button and then select `Third Party` login or `Cookie` login.

> Note: If you want to use third-party login(**Recommended**), please make sure your account has been connected to the third-party. If you want to use `Cookie` login, click [here](https://github.com/LeetCode-OpenSource/vscode-leetcode/issues/478#issuecomment-564757098) to see the steps.

## Requirements

- [VS Code 1.30.1+](https://code.visualstudio.com/)
- [Node.js 10+](https://nodejs.org)
  > NOTE: Please make sure that `Node` is in your `PATH` environment variable. You can also use the setting `leetcode.nodePath` to specify the location of your `Node.js` executable.

## Quick Start

![demo](https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/gifs/demo.gif)

## Features

### Sign In/Out

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/sign_in.png" alt="Sign in" />
</p>

- Simply click `Sign in to LeetCode` in the `LeetCode Explorer` will let you **sign in** with your LeetCode account.

- You can also use the following command to sign in/out:
  - **LeetCode: Sign in**
  - **LeetCode: Sign out**

---

### Switch Endpoint

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/endpoint.png" alt="Switch Endpoint" />
</p>

- By clicking the button ![btn_endpoint](https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/btn_endpoint.png) at the **explorer's navigation bar**, you can switch between different endpoints.

- The supported endpoints are:

  - **leetcode.com**
  - **leetcode.cn**

  > Note: The accounts of different endpoints are **not** shared. Please make sure you are using the right endpoint. The extension will use `leetcode.com` by default.

---

### Pick a Problem

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/pick_problem.png" alt="Pick a Problem" />
</p>

- Directly click on the problem or right click the problem in the `LeetCode Explorer` and select `Preview Problem` to see the problem description.
- Select `Show Problem` to directly open the file with the problem description.

  > Note：You can specify the path of the workspace folder to store the problem files by updating the setting `leetcode.workspaceFolder`. The default value is：**$HOME/.leetcode/**.

  > You can specify whether including the problem description in comments or not by updating the setting `leetcode.showCommentDescription`.

  > You can switch the default language by triggering the command: `LeetCode: Switch Default Language`.

---

### Editor Shortcuts

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/shortcuts.png" alt="Editor Shortcuts" />
</p>

- The extension supports 5 editor shortcuts (aka Code Lens):

  - `Submit`: Submit your answer to LeetCode.
  - `Test`: Test your answer with customized test cases.
  - `Star/Unstar`: Star or unstar the current problem.
  - `Solution`: Show the top voted solution for the current problem.
  - `Description`: Show the problem description page.

  > Note: You can customize the shortcuts using the setting: `leetcode.editor.shortcuts`. By default, only `Submit` and `Test` shortcuts are enabled.

---

### Search problems by Keywords

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/search.png" alt="Search problems by Keywords" />
</p>

- By clicking the button ![btn_search](https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/btn_search.png) at the **explorer's navigation bar**, you can search the problems by keywords.

---

### Manage Session

<p align="center">
  <img src="https://raw.githubusercontent.com/KevinLi0w0/vscode-leetcode-plus/master/docs/imgs/session.png" alt="Manage Session" />
</p>

- To manage your LeetCode sessions, just clicking the `LeetCode: ***` at the bottom of the status bar. You can **switch** between sessions or **create**, **delete** a session.

## Settings

| Setting Name                      | Description                                                                                                                                                                                                                                                   | Default Value      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `leetcode.hideSolved`             | Specify to hide the solved problems or not                                                                                                                                                                                                                    | `false`            |
| `leetcode.defaultLanguage`        | Specify the default language used to solve the problem. Supported languages are: `bash`, `c`, `cpp`, `csharp`, `golang`, `java`, `javascript`, `kotlin`, `mysql`, `php`, `python`,`python3`,`ruby`,`rust`, `scala`, `swift`, `typescript`                     | `N/A`              |
| `leetcode.useWsl`                 | Specify whether to use WSL or not                                                                                                                                                                                                                             | `false`            |
| `leetcode.endpoint`               | Specify the active endpoint. Supported endpoints are: `leetcode`, `leetcode-cn`                                                                                                                                                                               | `leetcode`         |
| `leetcode.workspaceFolder`        | Specify the path of the workspace folder to store the problem files.                                                                                                                                                                                          | `""`               |
| `leetcode.filePath`               | Specify the relative path under the workspace and the file name to save the problem files. More details can be found [here](https://github.com/LeetCode-OpenSource/vscode-leetcode/wiki/Customize-the-Relative-Folder-and-the-File-Name-of-the-Problem-File). |                    |
| `leetcode.enableStatusBar`        | Specify whether the LeetCode status bar will be shown or not.                                                                                                                                                                                                 | `true`             |
| `leetcode.editor.shortcuts`       | Specify the customized shortcuts in editors. Supported values are: `submit`, `test`, `star`, `solution` and `description`.                                                                                                                                    | `["submit, test"]` |
| `leetcode.enableSideMode`         | Specify whether `preview`, `solution` and `submission` tab should be grouped into the second editor column when solving a problem.                                                                                                                            | `true`             |
| `leetcode.nodePath`               | Specify the `Node.js` executable path. for example, C:\Program Files\nodejs\node.exe                                                                                                                                                                          | `node`             |
| `leetcode.showCommentDescription` | Specify whether to include the problem description in the comments                                                                                                                                                                                            | `false`            |
| `leetcode.useEndpointTranslation` | Use endpoint's translation (if available)                                                                                                                                                                                                                     | `true`             |
| `leetcode.colorizeProblems`       | Add difficulty badge and colorize problems files in explorer tree                                                                                                                                                                                             | `true`             |
| `leetcode.problems.sortStrategy`  | Specify sorting strategy for problems list                                                                                                                                                                                                                    | `None`             |
| `leetcode.allowReportData`        | Allow LeetCode to report anonymous usage data to improve the product. list                                                                                                                                                                                    | `true`             |

## Want Help?

When you meet any problem, you can check out the [Troubleshooting](https://github.com/KevinLi0w0/vscode-leetcode-plus/wiki/Troubleshooting) and [FAQ](https://github.com/KevinLi0w0/vscode-leetcode-plus/wiki/FAQ) first.

If your problem still cannot be addressed, feel free to [file an issue](https://github.com/KevinLi0w0/vscode-leetcode-plus/issues/new).

## Release Notes

Refer to [CHANGELOG](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/CHANGELOG.md)

## Changelog (Plus)

### v0.19.0

Based on vscode-leetcode v0.18.4. The following changes were made:

**Features:**
- Added i18n infrastructure with Chinese (zh-CN) and English (en) string tables
- Added `leetcode.language` setting (`auto` / `en` / `zh-CN`) with auto-detection from VS Code display language
- Added `LeetCode: Switch UI Language` command for quick language toggle at runtime
- Localized all major UI strings: explorer categories, dialog buttons, progress messages, error messages, sign-in prompts
- Added Study Plan category in LeetCode Explorer (leetcode.cn endpoint only)
  - Built-in plans: Hot 100 (`top-100-liked`) and SQL 50 (`sql-free-50`)
  - Fetches problem IDs from study plan pages with hardcoded fallback lists
  - Added `leetcode.studyPlans` setting for custom study plan slugs
- Added `leetcode.editor.previewOnLeft` setting to place preview on left, code on right (default: `true`)

**Bug Fixes:**
- Fixed pre-existing bug: `promptForSignIn()` always opened `leetcode.cn` for Sign Up regardless of endpoint
- Refactored hide-solved filter from cache layer to display layer — study plan now shows all problems regardless of hide-solved setting
- `DialogOptions` now use getters so language changes take effect at call time without window reload
- Study plan endpoint check moved inside try/catch for graceful degradation when switching endpoints

## Acknowledgement

- This extension is based on [@skygragon](https://github.com/skygragon)'s [leetcode-cli](https://github.com/skygragon/leetcode-cli) open source project.
- This is a community fork of [vscode-leetcode](https://github.com/LeetCode-OpenSource/vscode-leetcode) by LeetCode, continued with new features.
- Special thanks to our [contributors](https://github.com/KevinLi0w0/vscode-leetcode-plus/blob/main/ACKNOWLEDGEMENTS.md).
