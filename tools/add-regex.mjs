/**
 * add-regex.mjs — Add new regex patterns to zh-CN.json
 * Usage: node tools/add-regex.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DICT_PATH = join(ROOT, 'src', 'dict', 'zh-CN.json');
const dict = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

const existingIds = new Set((dict.regex || []).map(r => r.id));

const newPatterns = [
  {
    id: 'no-results-for',
    pattern: { source: '^No results for (.+)$', flags: 'i' },
    replace: '未找到 "$1" 的结果'
  },
  {
    id: 'syncing-prs',
    pattern: { source: '^Syncing PRs:\\s*(\\d+)\\s*/\\s*(\\d+)$', flags: 'i' },
    replace: '同步 PR 中: $1 / $2'
  },
  {
    id: 'active-count',
    pattern: { source: '^Active\\s*\\((\\d+)\\)$', flags: 'i' },
    replace: '活跃 ($1)'
  },
  {
    id: 'archived-count',
    pattern: { source: '^Archived\\s*\\((\\d+)\\)$', flags: 'i' },
    replace: '已归档 ($1)'
  },
  {
    id: 'n-selected',
    pattern: { source: '^(\\d+)\\s+selected$', flags: 'i' },
    replace: '已选中 $1 项'
  },
  {
    id: 'n-items',
    pattern: { source: '^(\\d+)\\s+items?$', flags: 'i' },
    replace: '$1 项'
  },
  {
    id: 'count-results',
    pattern: { source: '^(\\d+)\\s+results?$', flags: 'i' },
    replace: '$1 个结果'
  },
  {
    id: 'count-minutes',
    pattern: { source: '^(\\d+)\\s+min(ute)?s?$', flags: 'i' },
    replace: '$1 分钟'
  },
  {
    id: 'count-hours',
    pattern: { source: '^(\\d+)\\s+hours?$', flags: 'i' },
    replace: '$1 小时'
  },
  {
    id: 'count-days',
    pattern: { source: '^(\\d+)\\s+days?$', flags: 'i' },
    replace: '$1 天'
  },
  {
    id: 'deleted-permanently',
    pattern: { source: '^"(.+)" will be permanently deleted\\.', flags: 'i' },
    replace: '"$1" 将被永久删除。'
  },
  {
    id: 'delete-n-tasks',
    pattern: { source: '^(\\d+) tasks? will be permanently deleted\\.', flags: 'i' },
    replace: '$1 个任务将被永久删除。'
  },
  {
    id: 'n-files-selected',
    pattern: { source: '^(\\d+) file\\(s\\) selected$', flags: 'i' },
    replace: '已选中 $1 个文件'
  },
  {
    id: 'n-lines-added-removed',
    pattern: { source: '^(\\d+) lines? added, (\\d+) lines? removed$', flags: 'i' },
    replace: '$1 行添加，$2 行删除'
  },
  {
    id: 'n-comments-in-n-files',
    pattern: { source: '^(\\d+) comments?\\(s\\) in (\\d+) files?\\(s\\)$', flags: 'i' },
    replace: '$1 条评论，$2 个文件'
  },
  {
    id: 'n-comment-in-n-files',
    pattern: { source: '^(\\d+) comment\\(s\\) in (\\d+) file\\(s\\)$', flags: 'i' },
    replace: '$1 条评论，$2 个文件'
  }
];

let added = 0, skipped = 0;
for (const pattern of newPatterns) {
  if (existingIds.has(pattern.id)) {
    skipped++;
    continue;
  }
  dict.regex.push(pattern);
  existingIds.add(pattern.id);
  added++;
}

writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2) + '\n', 'utf-8');
console.log(`Added ${added} regex patterns, skipped ${skipped}. Total: ${dict.regex.length}`);
