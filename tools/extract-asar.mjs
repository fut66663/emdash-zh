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
const totalHeaderSize = buf.readUInt32LE(buf.length - 4);
const headerSize = totalHeaderSize - 4;
const headerStr = buf.slice(buf.length - totalHeaderSize, buf.length - 4).toString('utf8');
const header = JSON.parse(headerStr);

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
        const start = parseInt(info.offset || 0);
        const size = parseInt(info.size);
        const content = buf.slice(start, start + size);
        writeFileSync(outPath, content);
        extracted++;
      }
    }
  }
}

console.log('Extracting app.asar...');
extractFiles(header.files, '', outDir);
console.log(`Done: ${extracted} files extracted, ${skipped} skipped (missing unpacked).`);
