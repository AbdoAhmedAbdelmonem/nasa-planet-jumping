const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

let src = null;
if (fs.existsSync('.output/public')) {
  src = '.output/public';
} else if (fs.existsSync('dist') && fs.readdirSync('dist').some(f => f !== 'client')) {
  src = 'dist';
} else if (fs.existsSync('public')) {
  src = 'public';
}

if (src) {
  console.log(`[sync-dist] Copying build output from ${src}...`);
  if (src !== 'dist') {
    copyDir(src, 'dist');
  }
  copyDir(src, 'dist/client');
  console.log('[sync-dist] Successfully populated dist/ and dist/client/ for Netlify deploy!');
} else {
  console.warn('[sync-dist] Warning: No source build directory found to copy.');
}
