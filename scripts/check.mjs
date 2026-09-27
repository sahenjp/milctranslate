import { readFile, access } from 'node:fs/promises';

const required = [
  'index.html', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg',
  'icon-192.png', 'icon-512.png', 'src/app.js', 'src/milc.js',
];

await Promise.all(required.map((file) => access(file)));
const html = await readFile('index.html', 'utf8');
const manifest = JSON.parse(await readFile('manifest.webmanifest', 'utf8'));

if (!html.includes('type="module" src="./src/app.js"')) throw new Error('app.js が読み込まれていません');
if (!html.includes('rel="manifest"')) throw new Error('manifest が読み込まれていません');
if (manifest.display !== 'standalone') throw new Error('PWA display が standalone ではありません');
if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) throw new Error('PWA icon が不足しています');
console.log('static check: ok');
