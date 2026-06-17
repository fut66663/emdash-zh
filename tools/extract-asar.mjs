/**
 * extract-asar.mjs — Extract app.asar to app/ directory.
 *
 * This is a standalone ASAR extractor that gracefully handles missing
 * unpacked files (e.g. win32-arm64 node-pty binaries) by creating
 * empty placeholder files.
 *
 * Usage: node tools/extract-asar.mjs <resources-path>
 * Example: node tools/extract-asar.mjs "E:/emdash/resources"
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const RESOURCES = process.argv[2];
if (!RESOURCES) {
  console.error('Usage: node tools/extract-asar.mjs <resources-path>');
  console.error('Example: node tools/extract-asar.mjs E:/emdash/resources');
  process.exit(1);
}

const asarPath = join(RESOURCES, 'app.asar');
const outDir = join(RESOURCES, 'app');
const unpackedDir = join(RESOURCES, 'app.asar.unpacked');

if (!existsSync(asarPath)) {
  console.error('ERROR: app.asar not found at', asarPath);
  process.exit(1);
}

// If app/ already exists, check if it has index.html (already extracted)
if (existsSync(join(outDir, 'out', 'renderer', 'index.html'))) {
  console.log('Already extracted: app/out/renderer/index.html exists.');
  process.exit(0);
}

const buf = readFileSync(asarPath);

let header;
let contentOffset;

// Detect ASAR format:
// New format (Emdash 2026+): header at beginning with 4 uint32 preamble
//   [4B:4] [4B:total] [4B:block_sz] [4B:json_len] [json] [files...]
// Old format (standard Electron): header at end, 4B size at tail
//   [files...] [json] [4B:total_size_incl_4]

if (buf.length >= 20 && buf.readUInt32LE(0) === 4 && buf.slice(16, 24).toString('utf8') === '{"files"') {
  // New format: 4 uint32 preamble, JSON at byte 16
  //   [4B:4] [4B:?] [4B:end_to_content] [4B:json_len] [json...] [files...]
  const jsonLen = buf.readUInt32LE(12);
  const headerStr = buf.slice(16, 16 + jsonLen).toString('utf8').replace(/\0+$/, '');
  header = JSON.parse(headerStr);
  contentOffset = 12 + buf.readUInt32LE(8);
  console.log(`Detected new ASAR format: json ${jsonLen} bytes, content at ${contentOffset}`);
} else {
  // Old format
  const totalHeaderSize = buf.readUInt32LE(buf.length - 4);
  const headerSize = totalHeaderSize - 4;
  const headerStr = buf.slice(buf.length - totalHeaderSize, buf.length - 4).toString('utf8');
  header = JSON.parse(headerStr);
  contentOffset = 0;
  console.log(`Detected old ASAR format: header ${headerSize} bytes at end`);
}

let skipped = 0;
let extracted = 0;

function extractFiles(files, basePath, currentOut) {
  for (const [name, info] of Object.entries(files)) {
    const outPath = join(currentOut, name);
    if (info.files) {
      mkdirSync(outPath, { recursive: true });
      extractFiles(info.files, join(basePath, name), outPath);
    } else {
      mkdirSync(dirname(outPath), { recursive: true });
      if (info.unpacked) {
        const unpackedPath = join(unpackedDir, basePath, name);
        if (existsSync(unpackedPath)) {
          copyFileSync(unpackedPath, outPath);
          extracted++;
        } else {
          writeFileSync(outPath, '');
          skipped++;
        }
      } else {
        const start = contentOffset + parseInt(info.offset || 0);
        const size = parseInt(info.size);
        const content = buf.slice(start, start + size);
        writeFileSync(outPath, content);
        extracted++;
      }
    }
  }
}

console.log('Extracting app.asar...');
try {
  extractFiles(header.files, '', outDir);
  console.log(`Done: ${extracted} files extracted, ${skipped} skipped (missing unpacked).`);
} catch (err) {
  console.error('Extraction failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
