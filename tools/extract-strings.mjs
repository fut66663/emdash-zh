/**
 * Extract all UI strings from Emdash main process code.
 * Usage: node tools/extract-strings.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const MAIN = 'E:/emdash/resources/app/out/main/index.js';
const DICT_PATH = join(ROOT, 'src', 'dict', 'zh-CN.json');

const dict = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const existing = new Set(Object.keys(dict.exact));

const source = readFileSync(MAIN, 'utf-8');

// Extract all string values from label:, description:, category:, title:
const patterns = [
  /\b(?:label|description|category|title):\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g,
  /\b(?:label|description|category|title):\s*'([^'\\]*(?:\\.[^'\\]*)*)'/g,
];

const found = new Map();

for (const pattern of patterns) {
  let match;
  while ((match = pattern.exec(source)) !== null) {
    let str;
    try {
      str = JSON.parse(`"${match[1]}"`);
    } catch {
      str = match[1];
    }
    if (!str) continue;
    if (str.length < 2) continue;
    if (existing.has(str)) continue;
    if (/^[a-z]+([A-Z][a-z]+)+$/.test(str)) continue; // camelCase
    if (/^[a-z]+(_[a-z]+)+$/.test(str)) continue; // snake_case
    if (/^[a-zA-Z0-9./_:-]+$/.test(str) && str.length > 30) continue; // paths
    found.set(str, (found.get(str) || 0) + 1);
  }
}

// Also extract all string literals that look like UI (2-60 chars, has space or starts with capital)
const strPattern = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
let m;
while ((m = strPattern.exec(source)) !== null) {
  let s;
  try { s = JSON.parse(`"${m[1]}"`); } catch { continue; }
  if (!s || s.length < 2 || s.length > 120) continue;
  if (existing.has(s)) continue;
  if (found.has(s)) continue;
  if (!/[A-Z]/.test(s[0]) && !/\s/.test(s)) continue;
  if (/^(true|false|null|undefined)$/i.test(s)) continue;
  if (/^[0-9.,:;!?@#$%^&*()\-+=[\]{}|/\\<>~`'"]+$/.test(s)) continue;
  if (/^(http|https|ws|wss|file|data):\/\//.test(s)) continue;
  if (/^[a-zA-Z0-9_]+$/.test(s) && s.length > 15) continue;
  found.set(s, (found.get(s) || 0) + 1);
}

// Sort by frequency (most used = most likely visible)
const sorted = [...found.entries()].sort((a, b) => b[1] - a[1]);

console.log(`Found ${sorted.length} untranslated UI strings (${existing.size} already in dictionary)\n`);

// Categorize
const labels = sorted.filter(([s]) => s.length < 50 && !s.includes('\n') && s.trim() === s);
const shortLabels = labels.filter(([s]) => s.length < 40 && s.split(' ').length <= 6);

console.log('=== Top 100 candidates for translation ===\n');
for (const [str, count] of shortLabels.slice(0, 100)) {
  console.log(`  [${count}x] ${str}`);
}

// Output JSON-ready format for easy copy-paste
console.log('\n=== JSON-ready (add to zh-CN.json exact section) ===\n');
for (const [str] of shortLabels.slice(0, 150)) {
  if (str.includes('"')) continue; // skip strings with quotes for now
  console.log(`"${str}": "",`);
}
