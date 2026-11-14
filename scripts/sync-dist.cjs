const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

// 1. Ensure target publish directories exist
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('dist/client', { recursive: true });

// 2. Sync generated Nitro public output if present (.output/public is outside dist)
if (fs.existsSync('.output/public')) {
  console.log('[sync-dist] Syncing .output/public -> dist and dist/client...');
  copyDir('.output/public', 'dist');
  copyDir('.output/public', 'dist/client');
}

// 3. Sync source public assets & vendor scripts (public is outside dist)
if (fs.existsSync('public')) {
  console.log('[sync-dist] Syncing public/ -> dist and dist/client...');
  copyDir('public', 'dist');
  copyDir('public', 'dist/client');
}

// 4. Ensure all root HTML entry points exist directly in dist and dist/client
const rootHtmls = [
  'index.html',
  'identify-twin.html',
  'moon-chunking.html',
  'mars-chunking.html',
  'planet-jumping.html'
];

rootHtmls.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('dist', file));
    fs.copyFileSync(file, path.join('dist/client', file));
  }
});

console.log('[sync-dist] Successfully populated dist/ and dist/client/ for Netlify deploy!');
