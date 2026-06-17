# emdash-zh 操作手册

## 目录

1. [日常操作](#日常操作)
2. [Emdash 更新后](#emdash-更新后)
3. [翻译词典维护](#翻译词典维护)
4. [紧急恢复](#紧急恢复)
5. [文件位置速查](#文件位置速查)

---

## 日常操作

### 安装（首次）

```
1. 关闭 Emdash
2. 双击 install.bat
3. 重启 Emdash
```

### 卸载

```
1. 关闭 Emdash
2. 双击 uninstall.bat
3. 重启 Emdash（恢复英文）
```

---

## Emdash 更新后

Emdash 大约每 5-6 天自动更新一次。更新后中文会消失。

### 操作步骤

```
1. 关闭 Emdash
2. 双击 install.bat    ← 自动检测新版本，重新解包+注入+菜单补丁
3. 重启 Emdash
```

耗时约 10 秒。翻译词典不受影响。

### 原理

```
Emdash 更新前:
  resources/
  ├── app.asar.bak       ← 旧版本备份
  └── app/               ← 旧版本解包（有中文注入）

Emdash 更新后:
  resources/
  ├── app.asar           ← ★ 新版本！install.bat 检测到后自动重提取
  ├── app.asar.bak       ← 旧版本备份
  └── app/               ← 旧版本（会被自动清除并重新解包）
```

---

## 翻译词典维护

### 新增翻译条目

1. 编辑 `src/dict/zh-CN.json`
2. 在 `"exact"` 对象中添加：`"English Text": "中文翻译"`
3. 保持字母排序（方便维护）

### 新增正则模式

编辑 `src/dict/zh-CN.json` 的 `"regex"` 数组：

```json
{
  "id": "my-pattern",
  "pattern": { "source": "^(\\d+)\\s+items?$", "flags": "i" },
  "replace": "$1 项"
}
```

### 部署更新

```
方法 A: 双击 dev-rebuild.bat    ← 快速：构建 + 部署（不重提取 asar，不重新补丁菜单）
方法 B: 双击 install.bat        ← 完整：包含全部步骤
```

重启 Emdash 生效。

### 从源码扫描缺失的翻译

```bash
# 扫描 Emdash TypeScript 源码，找出未翻译的 UI 字符串
node tools/scan-source.mjs

# 批量添加翻译
node tools/batch-add.mjs
node tools/build.mjs
```

---

## 紧急恢复

### 情况 1: Emdash 启动不了

```
1. 双击 uninstall.bat    ← 恢复所有原始文件
2. 重启 Emdash
```

uninstall.bat 会恢复：
- `index.html`（移除注入标签）
- `app/out/main/index.js`（恢复英文菜单）
- `app.asar`（恢复原始打包）
- 删除 `emdash-zh.js`

### 情况 2: 部分翻译出问题

如果只有某条翻译不对，直接编辑 `src/dict/zh-CN.json` 修正该条目，然后 `dev-rebuild.bat`。

### 情况 3: 手动恢复

```
resources\
  app.asar.bak  → 重命名为 app.asar（恢复 Emdash 原始状态）
  app\          → 删除（或保留，不影响）
  app\out\renderer\index.html.emdash-zh-backup → 覆盖 index.html
  app\out\main\index.js.emdash-zh-backup → 覆盖 index.js
```

---

## 文件位置速查

### 项目文件（E:\emdash-zh\）

| 文件 | 用途 |
|---|---|
| `install.bat` | 一键安装（首次/更新后） |
| `uninstall.bat` | 一键卸载 |
| `dev-rebuild.bat` | 翻译更新快速部署 |
| `src/dict/zh-CN.json` | **翻译词典（核心文件）** |
| `src/emdash-zh.js` | 翻译引擎源码 |
| `dist/emdash-zh.js` | 构建后的引擎 |
| `tools/build.mjs` | 构建脚本 |
| `tools/extract-asar.mjs` | ASAR 解包 |
| `tools/patch-main-menu.mjs` | 菜单补丁 |
| `tools/scan-source.mjs` | 源码扫描 |
| `docs/OPERATIONS.md` | 本手册 |

### Emdash 安装目录

| 路径 | 说明 |
|---|---|
| `resources/app.asar` | Emdash 原始打包（更新后出现） |
| `resources/app.asar.bak` | 旧版本备份 |
| `resources/app.asar.unpacked/` | 原生模块 |
| `resources/app/` | 解包后的应用目录 |
| `resources/app/out/renderer/index.html` | **注入点** |
| `resources/app/out/renderer/assets/emdash-zh.js` | **翻译引擎** |
| `resources/app/out/main/index.js` | **主进程（菜单补丁）** |

### 备份文件（自动创建）

| 备份 | 原文件 |
|---|---|
| `index.html.emdash-zh-backup` | `index.html` |
| `index.js.emdash-zh-backup` | `out/main/index.js` |
| `app.asar.bak` | `app.asar` |

---

## 工作流总结

```
初始安装:
  下载 emdash-zh → install.bat → 完成

Emdash 更新后:
  install.bat → 完成（3秒）

翻译有误/新增:
  编辑 zh-CN.json → dev-rebuild.bat → 重启 Emdash

出问题了:
  uninstall.bat → 恢复原始状态
```
