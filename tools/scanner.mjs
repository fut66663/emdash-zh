/**
 * scanner.mjs — Extract untranslated English UI strings from Emdash's React bundle.
 *
 * Reads the minified JS bundle, extracts string literals that look like UI text,
 * compares against the existing dictionary, and outputs candidates for translation.
 *
 * Usage: node tools/scanner.mjs [--top N]
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Paths
const BUNDLE_DIR = 'E:/emdash/resources/app/out/renderer/assets';
const DICT_PATH = join(ROOT, 'src', 'dict', 'zh-CN.json');

// Load existing dictionary
const dict = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const existingKeys = new Set(Object.keys(dict.exact));

// Find the main JS bundle
const assets = readdirSync(BUNDLE_DIR);
const bundleFile = assets.find(f => f.startsWith('index-') && f.endsWith('.js'));
if (!bundleFile) {
  console.error('ERROR: Could not find Emdash JS bundle.');
  process.exit(1);
}

const bundlePath = join(BUNDLE_DIR, bundleFile);
const bundle = readFileSync(bundlePath, 'utf-8');
console.log(`Loaded bundle: ${bundleFile} (${(bundle.length / 1024 / 1024).toFixed(1)} MB)`);

// Extract string literals
const stringPattern = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
const candidateCounts = new Map();
let match;

while ((match = stringPattern.exec(bundle)) !== null) {
  const raw = match[1];
  // Unescape
  let str;
  try {
    str = JSON.parse(`"${raw}"`);
  } catch {
    continue;
  }

  if (!isLikelyUIString(str)) continue;
  if (existingKeys.has(str)) continue;

  candidateCounts.set(str, (candidateCounts.get(str) || 0) + 1);
}

// Heuristics: does this look like user-visible text?
function isLikelyUIString(s) {
  if (s.length < 2 || s.length > 200) return false;
  if (/^\s*$/.test(s)) return false;
  if (/^[0-9.,:;!?@#$%^&*()\-+=[\]{}|/\\<>~`'"]+$/.test(s)) return false;
  if (/^(true|false|null|undefined)$/i.test(s)) return false;
  if (/^[a-z]+([A-Z][a-z]+)+$/.test(s)) return false; // camelCase
  if (/^[a-z]+(_[a-z]+)+$/.test(s)) return false; // snake_case
  if (/^(http|https|ws|wss|file|data):\/\//.test(s)) return false; // URLs
  if (/^\.[a-zA-Z-]+/.test(s) && !s.includes(' ')) return false; // CSS selectors/classes
  if (/^[a-zA-Z0-9_]+$/.test(s) && s.length > 15) return false; // long IDs
  if (/^[a-z]+$/i.test(s) && s.length < 4) return false; // short single words
  if (/^[0-9]+px|em|rem|%|vh|vw$/.test(s)) return false; // CSS values
  if (/^[a-zA-Z0-9./_-]+$/.test(s) && s.length > 20) return false; // paths/identifiers
  if (/^[{}()[\]:;,'"`]/.test(s)) return false; // code fragments
  if (/^(function|const|let|var|return|import|export|class|extends|this|new|typeof)$/.test(s)) return false;

  // Positive signals
  let score = 0;
  if (/[A-Z]/.test(s[0])) score++; // Starts with capital
  if (/\s/.test(s)) score += 2; // Contains space (almost certainly UI)
  if (/[.,!?;:]$/.test(s)) score++; // Ends with punctuation
  if (/^(Cancel|Save|Delete|Open|Close|Add|Edit|Create|Search|Settings|View|Select|Choose|Enter|Type|Click|Press|Hold)/.test(s)) score += 2;
  if (s.length < 50 && /\s/.test(s)) score += 2;
  if (/^[A-Z][a-z]+(\s+[a-zA-Z]+)+$/.test(s)) score++; // Title Case phrase

  return score >= 3;
}

// Convert counts to sorted list
const candidates = [...candidateCounts.entries()]
  .sort((a, b) => b[1] - a[1]) // Sort by frequency (most common = more likely UI)
  .slice(0, 500);

// Group by category
const byCategory = {
  singleWords: [],
  shortPhrases: [], // 2-3 words
  longPhrases: [],
  questions: [],
  withPunctuation: [],
  lowerCasePhrases: [],
};

for (const [str, count] of candidates) {
  if (str.includes('?')) {
    byCategory.questions.push([str, count]);
  } else if (!str.includes(' ')) {
    byCategory.singleWords.push([str, count]);
  } else if (str.split(' ').length <= 4) {
    byCategory.shortPhrases.push([str, count]);
  } else {
    byCategory.longPhrases.push([str, count]);
  }

  if (/[.,!;:]$/.test(str) && !str.includes('?')) {
    byCategory.withPunctuation.push([str, count]);
  }
  if (!/[A-Z]/.test(str[0]) && str.includes(' ')) {
    byCategory.lowerCasePhrases.push([str, count]);
  }
}

// Print results
printSection('Highest frequency (most likely UI)', candidates.slice(0, 50));
printSection('Short phrases (2-4 words)', byCategory.shortPhrases.slice(0, 50));
printSection('Single words', byCategory.singleWords.slice(0, 30));
printSection('Questions', byCategory.questions.slice(0, 20));
printSection('Lowercase starter (labels, status)', byCategory.lowerCasePhrases.slice(0, 20));

// Output JSON for easy copy to dictionary
console.log('\n--- JSON-ready top 100 candidates (add to zh-CN.json exact section) ---');
const top100 = candidates.slice(0, 100);
for (const [str] of top100) {
  console.log(`"${str}": "",`);
}

function printSection(title, items) {
  console.log(`\n=== ${title} (${items.length}) ===`);
  for (const [str, count] of items.slice(0, 50)) {
    console.log(`  [${count}x] ${str}`);
  }
}

console.log(`\nTotal candidates found: ${candidates.length}`);
console.log(`Existing dictionary entries: ${existingKeys.size}`);
