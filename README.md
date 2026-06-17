# emdash-zh

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Emdash](https://img.shields.io/badge/Emdash-v1.1.33+-green.svg)](https://emdash.sh)

**Emdash 中文本地化工具** — 为 [Emdash](https://emdash.sh) 提供运行时中文翻译注入，不依赖 Emdash 更新周期。

*Chinese localization engine for Emdash — injects translations at runtime, independent of Emdash update cycle.*

---

## 安装 / Install

### 前提 / Prerequisites
- [Node.js](https://nodejs.org) (for ASAR extraction and menu patching)
- Emdash installed (any version >= 1.1.33)

### 一键安装 / One-Click Install
1. 关闭 Emdash / Close Emdash
2. 双击运行 `install.bat` / Double-click `install.bat`
3. 重新启动 Emdash — 看到中文界面！

```
  下载本仓库 → 关闭 Emdash → 双击 install.bat → 完成！
```

**install.bat 会自动完成：**
- 检测 Emdash 安装位置
- 解压 `app.asar` → `app/` 目录
- 注入翻译引擎脚本
- 翻译原生菜单（文件/编辑/查看/帮助）
- 创建备份，随时可恢复

### 卸载 / Uninstall
双击 `uninstall.bat`，自动恢复所有原始文件。

### 更新后重装 / Reinstall After Emdash Update
Emdash 自动更新后，重新运行 `install.bat` 即可（3 秒）。

---

## 工作原理 / How It Works

```
┌─────────────────────────────────────┐
│  Emdash App                         │
│  ┌───────────────────────────────┐  │
│  │  index.html                   │  │
│  │  ├── emdash-zh.js ← injected  │  │
│  │  └── React bundle (ESM)       │  │
│  └───────────────────────────────┘  │
│                                     │
│  emdash-zh.js:                      │
│  ├── MutationObserver (DOM 变化)     │
│  ├── TreeWalker (文本节点扫描)        │
│  ├── 1340+ 精确匹配字典               │
│  └── 33 正则模式 (动态文本)           │
│                                     │
│  main/index.js (menu patch):        │
│  └── Electron 原生菜单 → 中文        │
└─────────────────────────────────────┘
```

- **DOM 翻译**: MutationObserver + TreeWalker 实时监听 React 渲染，精确匹配 + 大小写不敏感 + 正则
- **菜单翻译**: 主进程补丁，修改 Electron `Menu.buildFromTemplate` 标签
- **零依赖**: 翻译引擎纯 JavaScript IIFE，无需任何第三方库
- **独立更新**: Emdash 更新不影响翻译；重跑 install.bat 即可恢复

---

## 翻译覆盖 / Coverage

| 区域 | 内容 |
|---|---|
| 菜单栏 | 文件/编辑/查看/帮助 + 全部子菜单 + 角色项 |
| 命令面板 | 全部命令标签、描述、分组 |
| 设置页 | 通用/外观/编辑器/终端/智能体/技能/MCP/通知/集成 |
| 项目管理 | 新建/克隆/SSH/GitHub/删除/归档 |
| 任务管理 | 创建/删除/重命名/固定/上下文栏 |
| Git | 暂存/提交/推送/拉取/PR/分支 |
| 自动化 | 调度/模板/运行历史 |
| 智能体 | 安装/配置/MCP 服务器 |
| 常用 UI | 按钮/对话框/状态/时间/日期/导航 |

**1340+ 精确匹配 · 33 正则模式 · 68KB 引擎**

---

## 项目结构 / Structure

```
emdash-zh/
├── README.md
├── LICENSE
├── install.bat           # 一键安装
├── uninstall.bat         # 一键卸载
├── dist/
│   └── emdash-zh.js      # 构建后的翻译引擎
├── src/
│   ├── emdash-zh.js      # 引擎源码
│   └── dict/
│       └── zh-CN.json    # 翻译词典（1340+ 条目）
└── tools/
    ├── build.mjs          # 构建脚本
    ├── extract-asar.mjs   # ASAR 解包
    ├── patch-main-menu.mjs# 菜单补丁
    └── ...
```

---

## 自定义词典 / Custom Dictionary

编辑 `src/dict/zh-CN.json`，然后重新构建：

```bash
node tools/build.mjs
```

`zh-CN.json` 格式：
```json
{
  "exact": {
    "Save": "保存",
    "Delete": "删除"
  },
  "regex": [
    {
      "id": "time-ago-minutes",
      "pattern": { "source": "^(\\d+)\\s+minutes?\\s+ago$", "flags": "i" },
      "replace": "$1 分钟前"
    }
  ]
}
```

---

## 贡献 / Contributing

欢迎 PR！请确保：
- 翻译准确、符合中文习惯
- 在 `zh-CN.json` 中保持字母排序
- 新正则模式添加到 `tools/add-regex.mjs`

---

## License

MIT — 自由使用、修改、分发。

*Free to use, modify, and distribute.*

---

## Credits

- [Emdash](https://emdash.sh) — Agentic Development Environment
- 本项目独立开发，与 Emdash 官方无关 / This project is independent of the Emdash team.
