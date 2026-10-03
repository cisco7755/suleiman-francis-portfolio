/**
 * Serves the static export in `out/`. `next start` cannot run an export.
 *
 *   node scripts/static-server.mjs [port]
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

export function startStaticServer({ port, outDir }) {
  const root = resolve(outDir);
  if (!existsSync(join(root, 'index.html'))) {
    throw new Error(`No static export at ${root}. Run npm run build first.`);
  }

  const server = createServer((req, res) => {
    const file = resolveFile(root, req.url ?? '/');
    if (!file) {
      const missing = join(root, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      if (req.method === 'HEAD' || !existsSync(missing)) {
        res.end();
        return;
      }
      createReadStream(missing).pipe(res);
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType(file) });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    createReadStream(file).pipe(res);
  });

  return new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolveListen(server));
  });
}

function contentType(file) {
  const fromExt = MIME[extname(file)];
  if (fromExt) return fromExt;
  // opengraph-image routes are extensionless PNGs.
  if (file.endsWith(`${sep}opengraph-image`)) return 'image/png';
  return 'application/octet-stream';
}

function resolveFile(root, url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, 'http://127.0.0.1').pathname);
  } catch {
    return null;
  }

  const relative = pathname.replace(/^\/+/, '');
  const candidates =
    pathname === '/'
      ? ['index.html']
      : [relative, join(relative, 'index.html'), `${relative}.html`];

  for (const candidate of candidates) {
    const file = resolve(root, candidate);
    if (file !== root && !file.startsWith(root + sep)) continue;
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const port = Number(process.argv[2] ?? 3000);
  const outDir = fileURLToPath(new URL('../out', import.meta.url));
  const server = await startStaticServer({ port, outDir });
  console.log(`Serving ${outDir} at http://127.0.0.1:${port}`);
  server.on('error', (error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
