import fs from 'node:fs';
import path from 'node:path';
import { localCollection } from '../src/constants/LocalCollection.js';

// Registry payloads must be stable across LF and CRLF checkouts.
// Preserve source semantics, file types and targets. The shadcn adapter omits
// custom metadata, so retain explicit local provenance for the new collection.
let payloads = 0;
const provenance = item => {
  const component = localCollection.find(component => component.variants.some(variant => item.name === component.name + '-' + variant));
  if (component) item.meta = { origin: 'local', style: component.style, docsUrl: 'http://localhost:5290/' + component.category.toLowerCase() + '/' + component.slug };
};
for (const filename of fs.readdirSync('public/r').filter(name => name.endsWith('.json'))) {
  const file = path.join('public/r', filename);
  const original = fs.readFileSync(file, 'utf8');
  const item = JSON.parse(original);
  provenance(item);
  const orderFiles = files => files?.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  orderFiles(item.files);
  for (const entry of item.items ?? []) { orderFiles(entry.files); provenance(entry); }
  for (const source of item.files ?? []) {
    if (typeof source.content !== 'string') continue;
    payloads++;
    const normalized = source.content.replace(/\r\n/g, '\n');
    source.content = normalized;
  }
  const formatted = JSON.stringify(item, null, '\t');
  if (formatted !== original) fs.writeFileSync(file, formatted);
}
console.log(`registry_source_payloads=${payloads}; newline_policy=LF; local_provenance_items=${localCollection.length * 4}`);
