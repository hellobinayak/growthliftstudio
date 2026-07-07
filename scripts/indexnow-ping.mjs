// Submit the site's URLs to IndexNow (Bing, Copilot, Yandex, etc.) so they
// get near-instant re-indexing after a deploy.
//
// Run AFTER the new build is live in production:  npm run indexnow
// Reads the URL list from public/sitemap.xml and posts them in one batch.
//
// The key must match the static key file served at the site root
// (public/<KEY>.txt), which IndexNow fetches to verify ownership.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const HOST = 'growthliftstudio.in';
const KEY = '69ebe086e4144eefbecbad0357a8a388';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const xml = await readFile(
    path.resolve(__dirname, '..', 'public', 'sitemap.xml'),
    'utf8'
  );
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) throw new Error('No <loc> URLs found in sitemap.xml');

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending). Anything else
  // is a problem (403 = key not found/verifiable, 422 = URL/host mismatch).
  console.log(`IndexNow responded: ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    const text = await res.text().catch(() => '');
    console.error('Submission not accepted.', text);
    process.exit(1);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
