/**
 * scan-source.mjs — Systematically extract all UI strings from Emdash source code.
 *
 * Walks all .tsx/.ts files, extracts string literals AND tagged strings
 * (label, title, description, placeholder, heading, aria-label, etc.),
 * filters for user-visible text, compares against dictionary, outputs
 * prioritized candidates.
 *
 * Usage: node tools/scan-source.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = 'E:/emdash-source';
const DICT_PATH = join(ROOT, 'src', 'dict', 'zh-CN.json');

const dict = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));
const existing = new Set(Object.keys(dict.exact));

// Collect all .tsx and .ts files
function walkDir(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === '__pycache__') continue;
    try {
      const st = statSync(full);
      if (st.isDirectory()) {
        files.push(...walkDir(full));
      } else if (st.isFile() && (entry.endsWith('.tsx') || entry.endsWith('.ts'))) {
        files.push(full);
      }
    } catch (_) {}
  }
  return files;
}

console.log('Collecting source files...');
const sourceFiles = walkDir(SRC);
console.log(`Found ${sourceFiles.length} source files.`);

// Extract strings
const found = new Map(); // string -> { count, files }

function addString(str, file) {
  if (!str || str.length < 2) return;
  if (str.length > 200) return;
  if (existing.has(str)) return;
  if (/^\s*$/.test(str)) return;
  if (/^[0-9.,:;!?@#$%^&*()\-+=[\]{}|/\\<>~`'"]+$/.test(str)) return;
  if (/^(true|false|null|undefined|NaN|Infinity)$/i.test(str)) return;
  if (/^[a-z]+([A-Z][a-z]+)+$/.test(str)) return;
  if (/^[a-z]+(_[a-z]+)+$/.test(str)) return;
  if (/^[a-z0-9_]+$/i.test(str) && str.length > 20) return;
  if (/^(http|https|ws|wss|file|data):\/\//.test(str)) return;
  if (/^(require|module|exports|import|export|default|function|return|const|let|var|async|await|yield|class|extends|super|this|typeof)$/.test(str)) return;
  if (/^[a-zA-Z0-9./_:-]+$/.test(str) && str.length > 25) return;
  if (str.startsWith('--') && !str.includes(' ')) return;
  if (/^[{}()[\]:;,'"`<>]+$/.test(str)) return;
  if (str.charAt(0) === '{' && str.charAt(str.length - 1) === '}') return;

  if (!isLikelyUI(str)) return;

  const entry = found.get(str);
  if (entry) {
    entry.count++;
    if (!entry.files.includes(file)) entry.files.push(file);
  } else {
    found.set(str, { count: 1, files: [basename(file)] });
  }
}

function isLikelyUI(s) {
  let score = 0;
  if (/\s/.test(s)) score += 3; // Has spaces = phrase
  if (/^[A-Z]/.test(s)) score += 1; // Capital start
  if (/[.,!?;:]$/.test(s)) score += 1; // Ends with punct
  if (/^(Cancel|Save|Delete|Open|Close|Add|Edit|Create|Search|Settings|View|Select|Choose|Enter|Type|Click|Press|Hold|Toggle|Show|Hide|Enable|Disable|Set|Get|Copy|Paste|Clear|Remove|Check|Uncheck|Confirm|Dismiss|Accept|Reject|Start|Stop|Pause|Resume|Next|Previous|Back|Forward|New|Go|Navigate|Browse|Send|Submit|Refresh|Reload|Restart|Retry|Import|Export|Filter|Sort|Reset|Change|Update|Download|Upload|Install|Uninstall|Launch|Quit|Exit|Undo|Redo|Find|Replace|Help|About)/.test(s)) score += 2;
  if (s.length < 60 && /\s/.test(s)) score += 1;
  if (/^(Welcome|Getting|Error|Warning|Success|Info|Loading|Processing|Connecting|Connected|Disconnected|Authenticating|Authorizing|Downloading|Uploading|Installing|Building|Compiling|Running|Stopping|Restarting|Searching|Saving|Deleting|Creating|Opening|Closing|Copying|Pasting|Moving|Renaming|Refreshing|Syncing|Merging|Pushing|Pulling|Fetching|Committing|Stashing|Rebasing|Checking|Validating|Verifying|Generating|Exploring) /.test(s)) score += 2;
  if (s.includes('…')) score += 1;
  if (s.includes('’') || s.includes('‘')) score += 1; // smart quotes

  return score >= 3;
}

// Process each source file
console.log('Extracting strings...');
for (const file of sourceFiles) {
  let content;
  try { content = readFileSync(file, 'utf-8'); } catch { continue; }

  // Pattern 1: String literals in TSX (single and double quoted)
  const doubleStr = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
  const singleStr = /'([^'\\]*(?:\\.[^'\\]*)*)'/g;
  const backtick = /`([^`\\]*(?:\\.[^`\\]*)*)`/g;

  for (const pattern of [doubleStr, singleStr, backtick]) {
    let m;
    while ((m = pattern.exec(content)) !== null) {
      let s;
      try { s = JSON.parse(`"${m[1].replace(/"/g, '\\"')}"`); } catch { s = m[1]; }
      addString(s, file);
    }
  }

  // Pattern 2: Tagged template literals and specific patterns
  // label: "xxx", title: "xxx", description: "xxx", heading: "xxx", placeholder: "xxx"
  const taggedPatterns = [
    /\b(?:label|title|description|heading|placeholder|aria-label|ariaLabel|tooltip|hint|message|text|name|summary|detail|caption|subtitle):\s*["']([^"']+)["']/g,
  ];

  for (const pattern of taggedPatterns) {
    let m;
    while ((m = pattern.exec(content)) !== null) {
      addString(m[1], file);
    }
  }
}

// Sort by frequency (most used = highest priority)
const sorted = [...found.entries()]
  .sort((a, b) => b[1].count - a[1].count)
  .filter(([s]) => {
    // Remove known non-translatable
    if (/^(Finder|VS Code|VSCodium|Cursor|Windsurf|Xcode|Kaku|Alacritty|Warp|iTerm2|Ghostty|Kitty|Termy|Zed|Kiro|Antigravity|Trae|IntelliJ|Android|WebStorm|PyCharm|RubyMine|RustRover|Codex|Conductor|Paseo|Superset|OpenCode)/.test(s)) return false;
    if (/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)$/.test(s)) return false;
    return true;
  });

console.log(`\nFound ${sorted.length} untranslated candidates (${existing.size} in dictionary).\n`);

// Print by category
const phrases = sorted.filter(([s]) => s.includes(' '));
const singleWords = sorted.filter(([s]) => !s.includes(' '));
const withEllipsis = sorted.filter(([s]) => s.includes('…'));
const withPunct = sorted.filter(([s]) => /[.,!?;:]$/.test(s));

function printSection(title, items, n = 40) {
  console.log(`\n=== ${title} (${items.length}) ===`);
  for (const [str, info] of items.slice(0, n)) {
    console.log(`  [${info.count}x] ${str}`);
  }
}

printSection('Phrases (highest priority)', phrases, 60);
printSection('Single words', singleWords, 30);
printSection('With ellipsis', withEllipsis, 20);

// JSON ready output
console.log('\n=== JSON-READY TOP 100 (for zh-CN.json) ===\n');
for (const [str] of sorted.slice(0, 100)) {
  const escaped = str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  console.log(`"${escaped}": "",`);
}

console.log(`\nTotal candidates: ${sorted.length}`);
