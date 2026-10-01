import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
const base = process.env.PULSAR_URL ?? 'http://127.0.0.1:5300';
const catalog = JSON.parse(fs.readFileSync('public/catalog.json', 'utf8'));
const prerender = JSON.parse(fs.readFileSync('output/playwright/prerender.json', 'utf8'));
const rows = [];
const queue = [
  ...prerender.rows.map(row => ({ type: 'page', url: row.route, file: row.file })),
  ...catalog.entries.map(item => ({ type: 'source', url: item.sourceUrl, file: `public${item.sourceUrl}` })),
  { type: 'catalog', url: '/catalog.json', file: 'public/catalog.json' }
];
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const item = queue.shift();
    try {
      const response = await fetch(`${base}${item.url}`, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200);
      const body = await response.text();
      const local = fs.readFileSync(item.file, 'utf8');
      if (item.type === 'page') {
        assert.equal(digest(body), digest(local), `Physical HTML differs: ${item.url}`);
        assert.ok(body.includes(`data-route="${item.url}"`));
        assert.ok(/<h1[^>]*>.+?<\/h1>/s.test(body));
      } else {
        assert.deepEqual(JSON.parse(body), JSON.parse(local));
      }
      rows.push({ ...item, passed: true, bytes: Buffer.byteLength(body), assertion: item.type === 'page' ? 'HTTP body == physical HTML; root.data-route == URL; h1 present' : 'HTTP JSON == local JSON' });
    } catch (error) { rows.push({ ...item, passed: false, error: error.message }); }
  }
}));
const result = { base, total: rows.length, passed: rows.filter(r => r.passed).length, failed: rows.filter(r => !r.passed).length, skipped: 0, rows: rows.sort((a, b) => a.url.localeCompare(b.url)) };
assert.equal(result.total, 8 + catalog.entries.length * 2 + 1);
fs.writeFileSync('output/playwright/assets-pass.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify({ total: result.total, passed: result.passed, failed: result.failed, skipped: 0 }));
assert.equal(result.failed, 0);
