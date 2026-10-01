import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { render } from '../.server/entry-server.js';
const catalog = JSON.parse(fs.readFileSync('src/data/catalog.json','utf8'));
const shell = fs.readFileSync('dist/index.html','utf8');
const routes = ['/', '/components', '/styles', '/docs', '/docs/ai', '/docs/motion', '/docs/sources', '/about', ...catalog.entries.map(c=>`/components/${c.id}`)];
const rows=[];
for (const route of routes) {
  const markup = await render(route);
  assert.ok(markup.includes('<h1'), `No heading for ${route}`);
  assert.ok(!markup.includes('window is not defined'));
  const heading = markup.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&') ?? 'PULSAR';
  const html = shell.replace('<div id="root"></div>', `<div id="root" data-route="${route}">${markup}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${heading} | PULSAR</title>`);
  const target = route==='/' ? 'dist/index.html' : path.join('dist',route.slice(1),'index.html');
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,html);
  assert.ok(fs.readFileSync(target,'utf8').includes(`data-route="${route}"`));
  rows.push({route,file:target,heading,bytes:Buffer.byteLength(html)});
}
assert.equal(rows.length,8+catalog.entries.length);
fs.mkdirSync('output/playwright',{recursive:true});
fs.writeFileSync('output/playwright/prerender.json',JSON.stringify({total:rows.length,passed:rows.length,failed:0,skipped:0,rows},null,2));
console.log(`prerendered=${rows.length}; pages=8; componentDetails=${catalog.entries.length}; failed=0; skipped=0`);
