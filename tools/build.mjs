/**
 * build.mjs — Build emdash-zh.js for distribution
 *
 * Reads src/emdash-zh.js as template, inlines the dictionary
 * from src/dict/zh-CN.json, minifies, outputs dist/emdash-zh.js.
 *
 * Usage: node tools/build.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Read engine source
const enginePath = join(ROOT, 'src', 'emdash-zh.js');
let engine = readFileSync(enginePath, 'utf-8');

// Read dictionary
const dictPath = join(ROOT, 'src', 'dict', 'zh-CN.json');
const dict = JSON.parse(readFileSync(dictPath, 'utf-8'));

// Build the inline dictionary string
function buildDictLiteral(obj, indent) {
  indent = indent || 0;
  const pad = '  '.repeat(indent);
  const pad1 = '  '.repeat(indent + 1);

  if (obj === null) return 'null';
  if (typeof obj === 'undefined') return 'undefined';

  if (typeof obj === 'string') {
    // Escape backslashes and quotes
    return JSON.stringify(obj);
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }

  if (obj instanceof RegExp) {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(function (item) {
      if (typeof item === 'object' && item !== null && !(item instanceof RegExp)) {
        return pad1 + buildDictLiteral(item, indent + 1);
      }
      return pad1 + buildDictLiteral(item);
    });
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const items = keys.map(function (key) {
      const val = obj[key];
      const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      let valStr;
      if (val instanceof RegExp) {
        valStr = val.toString();
      } else {
        valStr = buildDictLiteral(val, indent + 1);
      }
      return pad1 + keyStr + ': ' + valStr;
    });
    return '{\n' + items.join(',\n') + '\n' + pad + '}';
  }

  return String(obj);
}

// Convert regex patterns from JSON to RegExp
function convertRegexEntries(regexArr) {
  return regexArr.map(function (entry) {
    const flags = entry.pattern.flags || '';
    const source = entry.pattern.source || entry.pattern;
    return {
      id: entry.id,
      pattern: 'new RegExp(' + JSON.stringify(source) + ', ' + JSON.stringify(flags) + ')',
      replace: JSON.stringify(entry.replace)
    };
  });
}

// Build the inline dict code
const processedExact = {};
for (const key in dict.exact) {
  if (dict.exact.hasOwnProperty(key)) {
    processedExact[key] = dict.exact[key];
  }
}

const exactLiteral = buildDictLiteral(processedExact);
const regexConverted = convertRegexEntries(dict.regex || []);

// Build regex pattern array
let regexLiteral = '[\n';
for (let i = 0; i < regexConverted.length; i++) {
  const entry = regexConverted[i];
  regexLiteral += '    {\n';
  regexLiteral += '      id: ' + JSON.stringify(entry.id) + ',\n';
  regexLiteral += '      pattern: ' + entry.pattern + ',\n';
  regexLiteral += '      replace: ' + entry.replace + '\n';
  regexLiteral += '    }';
  if (i < regexConverted.length - 1) regexLiteral += ',';
  regexLiteral += '\n';
}
regexLiteral += '  ]';

// Replace the dictionary section in the engine
// Find and replace between the DICT markers
const startMarker = "var DICT = {";
const endMarker = "  // ============================================================\n  // 2. SKIP LOGIC";

const startIdx = engine.indexOf(startMarker);
const endIdx = engine.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: Could not find DICT section in engine source.');
  process.exit(1);
}

const replacement = 'var DICT = {\n    exact: ' + exactLiteral + ',\n    regex: ' + regexLiteral + '\n  };\n\n' + endMarker;

const before = engine.substring(0, startIdx);
const after = engine.substring(endIdx + endMarker.length);
engine = before + replacement + after;

// Simple minification
function minify(code) {
  // Remove multi-line comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove single-line comments (but not inside strings)
  code = code.replace(/\/\/.*$/gm, '');
  // Collapse multiple blank lines
  code = code.replace(/\n\s*\n\s*\n/g, '\n\n');
  // Remove trailing whitespace
  code = code.replace(/[ \t]+$/gm, '');
  // Remove leading whitespace from beginning of file
  code = code.trim();
  return code;
}

engine = minify(engine);

// Write dist
const distDir = join(ROOT, 'dist');
try { mkdirSync(distDir, { recursive: true }); } catch (_) {}
writeFileSync(join(distDir, 'emdash-zh.js'), engine, 'utf-8');

// Stats
const dictCount = Object.keys(processedExact).length;
const regexCount = regexConverted.length;
const sizeKB = (Buffer.byteLength(engine) / 1024).toFixed(1);

console.log('Build complete:');
console.log('  Exact matches: ' + dictCount);
console.log('  Regex patterns: ' + regexCount);
console.log('  Output size: ' + sizeKB + ' KB');
console.log('  Output: dist/emdash-zh.js');
