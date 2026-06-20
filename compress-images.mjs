import sharp from 'sharp';
import { readdir, stat, writeFile, unlink } from 'fs/promises';
import { join, extname } from 'path';

const IMAGES_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 75;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const originalSize = (await stat(filePath)).size;
  totalBefore += originalSize;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image.resize({
      width: Math.min(metadata.width || MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
    });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: QUALITY });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    const buffer = await pipeline.toBuffer();
    
    // Only overwrite if smaller
    if (buffer.length < originalSize) {
      await writeFile(filePath, buffer);
      totalAfter += buffer.length;
      const saved = ((1 - buffer.length / originalSize) * 100).toFixed(1);
      console.log(`✅ ${filePath} — ${(originalSize/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB (${saved}% saved)`);
    } else {
      totalAfter += originalSize;
      console.log(`⏭️ ${filePath} — already optimal`);
    }
    count++;
  } catch (err) {
    totalAfter += originalSize;
    console.error(`❌ ${filePath} — ${err.message}`);
  }
}

console.log('🖼️  Compressing images...\n');
const files = await getFiles(IMAGES_DIR);
for (const file of files) {
  await compressImage(file);
}

console.log(`\n📊 Summary:`);
console.log(`   Files processed: ${count}`);
console.log(`   Before: ${(totalBefore/1024/1024).toFixed(1)} MB`);
console.log(`   After:  ${(totalAfter/1024/1024).toFixed(1)} MB`);
console.log(`   Saved:  ${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%`);
