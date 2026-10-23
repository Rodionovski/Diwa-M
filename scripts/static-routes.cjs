const { mkdirSync, copyFileSync } = require('node:fs');
const { join } = require('node:path');

// Render Static Sites can serve each known route without a dashboard rewrite.
for (const route of ['admin', 'services', 'gallery']) {
  const directory = join(__dirname, '..', 'dist', route);
  mkdirSync(directory, { recursive: true });
  copyFileSync(join(__dirname, '..', 'dist', 'index.html'), join(directory, 'index.html'));
}
