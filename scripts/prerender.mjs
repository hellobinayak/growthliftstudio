// Static prerender of all site routes using a maintained Puppeteer + a tiny
// same-origin static server. Runs as `postbuild` after `vite build`.
//
// For each route it serves the freshly built SPA shell (dist/index.html),
// lets the React app render + inject its per-page <head> (title, meta,
// canonical, JSON-LD via SEO.tsx), snapshots the full DOM, and writes it to
// dist/<route>/index.html so non-JS AI crawlers get real HTML.
//
// Replaces react-snap (unmaintained, shipped a 2018 Chromium that could not
// execute modern JS). Puppeteer is actively maintained and bundles a current
// Chrome, so no Vite down-levelling is required.

import http from 'node:http';
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PUBLIC = path.resolve(__dirname, '..', 'public');
const PORT = 45678;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// Derive the route list from the sitemap so it stays the single source of truth.
async function getRoutes() {
  const xml = await readFile(path.join(PUBLIC, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const routes = locs.map((u) => new URL(u).pathname.replace(/\/$/, '') || '/');
  return [...new Set(routes)];
}

function contentType(file) {
  return MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

// Serve real built files; fall back to the SPA shell so any route boots.
function startServer() {
  const shellPath = path.join(DIST, 'index.html');
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        const candidate = path.join(DIST, urlPath);
        if (
          candidate.startsWith(DIST) &&
          existsSync(candidate) &&
          (await stat(candidate)).isFile()
        ) {
          res.writeHead(200, { 'Content-Type': contentType(candidate) });
          res.end(await readFile(candidate));
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(await readFile(shellPath));
      } catch (err) {
        res.writeHead(500);
        res.end(String(err));
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function prerender() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    throw new Error('dist/index.html not found — run `vite build` first.');
  }
  const routes = await getRoutes();
  const server = await startServer();
  let executablePath;
  if (process.env.VERCEL) {
    executablePath = await chromium.executablePath();
  } else {
    executablePath = process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }
  
  console.log('Using executablePath:', executablePath);
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless === true ? 'new' : chromium.headless,
  });

  let ok = 0;
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      // Block cross-origin requests (analytics, fonts, Google Drive iframes)
      // so the crawl never hangs. They don't affect the captured DOM/text.
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        if (r.url().startsWith(ORIGIN)) r.continue();
        else r.abort();
      });

      await page.goto(`${ORIGIN}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
      // Ensure the app actually mounted content into #root.
      await page
        .waitForFunction('document.querySelector("#root")?.children.length > 0', {
          timeout: 15000,
        })
        .catch(() => {});

      const html =
        '<!DOCTYPE html>\n' +
        (await page.evaluate(() => document.documentElement.outerHTML));

      const outDir =
        route === '/' ? DIST : path.join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      await page.close();
      ok += 1;
      console.log(`  ✓ prerendered ${route}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`\nPrerendered ${ok}/${routes.length} routes to static HTML.`);
  if (ok !== routes.length) process.exitCode = 1;
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
