import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/src', { recursive: true });
for (const file of ['index.html', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-192.png', 'icon-512.png', '.nojekyll']) {
  await cp(file, `dist/${file}`);
}
await cp('src/app.js', 'dist/src/app.js');
await cp('src/milc.js', 'dist/src/milc.js');
console.log('build: dist/ ready');
