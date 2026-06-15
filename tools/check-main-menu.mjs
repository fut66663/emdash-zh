import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAIN = 'E:/emdash/resources/app/out/main/index.js';
const c = readFileSync(MAIN, 'utf8');

const tests = [
  { en: 'File', zh: '文件' },
  { en: 'Edit', zh: '编辑' },
  { en: 'View', zh: '查看' },
  { en: 'Help', zh: '帮助' },
  { en: 'Undo', zh: '撤销' },
  { en: 'Redo', zh: '重做' },
  { en: 'Docs', zh: '文档' },
  { en: 'Changelog', zh: '更新日志' },
  { en: 'Settings…', zh: '设置…' },
  { en: 'Check for Updates…', zh: '检查更新…' },
  { en: 'Report Issue…', zh: '报告问题…' },
  { en: 'Copy Installation ID', zh: '复制安装 ID' },
  { en: 'Give Feedback', zh: '反馈' },
  { en: 'Troubleshooting', zh: '故障排除' },
  { en: 'Quit', zh: '退出' },
  { en: 'About', zh: '关于' },
  { en: 'Close Tab', zh: '关闭标签页' },
  { en: 'Select All', zh: '全选' },
  { en: 'Services', zh: '服务' },
  { en: 'Hide', zh: '隐藏' },
  { en: 'Hide Others', zh: '隐藏其他' },
  { en: 'Show All', zh: '全部显示' },
  { en: 'Window', zh: '窗口' },
  { en: 'Minimize', zh: '最小化' },
  { en: 'Zoom', zh: '缩放' },
];

console.log('=== Checking main process bundle for native menu strings ===\n');
let total = 0;
let found = 0;

for (const { en, zh } of tests) {
  // Escape for regex
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'g');
  const matches = c.match(re);
  const count = matches ? matches.length : 0;
  total++;
  if (count > 0) {
    found++;
    console.log(`  [${count}x] "${en}" → 可替换为 "${zh}"`);
  } else {
    console.log(`  [NOT FOUND] "${en}"`);
  }
}

console.log(`\nFound ${found}/${total} menu strings in main process.`);
console.log(`\nVerdict: ${found >= 15 ? 'CAN patch main process for native menu translation' : 'Strings may be obfuscated'}`);
