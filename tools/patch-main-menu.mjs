/**
 * patch-main-menu.mjs — Patch native Electron menu labels in main process bundle
 *
 * The menu template is preserved as readable source code in the minified bundle.
 * This script does exact-string replacements on label: "XXX" patterns.
 *
 * Usage: node tools/patch-main-menu.mjs
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const RESOURCES = process.argv[2];
if (!RESOURCES) {
  console.error('Usage: node tools/patch-main-menu.mjs <resources-path>');
  console.error('Example: node tools/patch-main-menu.mjs E:/emdash/resources');
  process.exit(1);
}

const MAIN_PATH = join(RESOURCES, 'app', 'out', 'main', 'index.js');
const BACKUP_PATH = 'E:/emdash/resources/app/out/main/index.js.emdash-zh-backup';

// Exact replacements: [find, replace]
// Using exact "label: \"XXX\"" patterns to avoid false matches
const REPLACEMENTS = [
  // Top-level menus
  ['label: "File"', 'label: "文件 (&F)"'],
  ['label: "Edit"', 'label: "编辑 (&E)"'],
  ['label: "View"', 'label: "查看 (&V)"'],
  ['label: "Help"', 'label: "帮助 (&H)"'],

  // Edit menu
  ['label: "Undo"', 'label: "撤销 (&U)"'],
  ['label: "Redo"', 'label: "重做 (&R)"'],

  // File menu items
  ['label: "Settings…"', 'label: "设置…"'],
  ['label: "Close Tab"', 'label: "关闭标签页"'],
  ['label: "Quit"', 'label: "退出 (&Q)"'],

  // Help menu items
  ['label: "Docs"', 'label: "文档"'],
  ['label: "Changelog"', 'label: "更新日志"'],
  ['label: "Troubleshooting"', 'label: "故障排除"'],
  ['label: "Report Issue…"', 'label: "报告问题…"'],
  ['label: "Check for Updates…"', 'label: "检查更新…"'],
  ['label: "Copy Installation ID"', 'label: "复制安装 ID"'],
  ['label: "Give Feedback"', 'label: "反馈"'],

  // macOS app menu
  ['label: `About ${app.name}`', 'label: `关于 ${app.name}`'],
  ['label: `Quit ${app.name}`', 'label: `退出 ${app.name}`'],

  // =========== Role-based items (Electron fills default labels, override with Chinese) ===========
  // Edit menu roles
  ['{ role: "cut" }', '{ role: "cut", label: "剪切" }'],
  ['{ role: "copy" }', '{ role: "copy", label: "复制" }'],
  ['{ role: "paste" }', '{ role: "paste", label: "粘贴" }'],
  ['{ role: "pasteAndMatchStyle" }', '{ role: "pasteAndMatchStyle", label: "粘贴并匹配样式" }'],
  ['{ role: "delete" }', '{ role: "delete", label: "删除" }'],
  ['{ role: "selectAll" }', '{ role: "selectAll", label: "全选" }'],

  // View menu roles
  ['{ role: "reload" }', '{ role: "reload", label: "重新加载" }'],
  ['{ role: "forceReload" }', '{ role: "forceReload", label: "强制重新加载" }'],
  ['{ role: "toggleDevTools" }', '{ role: "toggleDevTools", label: "开发者工具" }'],
  ['{ role: "resetZoom" }', '{ role: "resetZoom", label: "重置缩放" }'],
  ['{ role: "zoomIn" }', '{ role: "zoomIn", label: "放大" }'],
  ['{ role: "zoomOut" }', '{ role: "zoomOut", label: "缩小" }'],
  ['{ role: "togglefullscreen" }', '{ role: "togglefullscreen", label: "全屏" }'],

  // Window menu role
  ['{ role: "windowMenu" }', '{ role: "windowMenu", label: "窗口" }'],

  // macOS app menu roles
  ['{ role: "services" }', '{ role: "services", label: "服务" }'],
  ['{ role: "hide" }', '{ role: "hide", label: "隐藏" }'],
  ['{ role: "hideOthers" }', '{ role: "hideOthers", label: "隐藏其他" }'],
  ['{ role: "unhide" }', '{ role: "unhide", label: "全部显示" }'],
];

// Create backup
console.log('Creating backup:', BACKUP_PATH);
copyFileSync(MAIN_PATH, BACKUP_PATH);

// Read and patch
let content = readFileSync(MAIN_PATH, 'utf-8');
let replaced = 0;

for (const [find, replace] of REPLACEMENTS) {
  const before = content;
  content = content.replaceAll(find, replace);
  const count = (before.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count > 0) {
    console.log(`  [${count}x] "${find}" → "${replace}"`);
    replaced += count;
  }
}

// Verify no damage to code
if (!content.includes('Menu.buildFromTemplate')) {
  console.error('ERROR: Menu.buildFromTemplate not found after patch! Restoring backup...');
  copyFileSync(BACKUP_PATH, MAIN_PATH);
  process.exit(1);
}

// Write patched version
writeFileSync(MAIN_PATH, content, 'utf-8');
console.log(`\nPatched ${replaced} occurrences.`);
console.log('Backup saved to:', BACKUP_PATH);
console.log('Main process menu labels now in Chinese.');

// Verify key translations are present
const checks = ['文件', '编辑', '查看', '帮助', '撤销', '重做', '设置…'];
for (const zh of checks) {
  if (content.includes(zh)) {
    console.log('  ✓', zh);
  } else {
    console.log('  ✗', zh, 'MISSING!');
  }
}
