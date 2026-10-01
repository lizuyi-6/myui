import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { componentMetadata } from '../../react-bits/src/constants/Information.js';
import { localCollection } from '../../react-bits/src/constants/LocalCollection.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.dirname(root);
const check = process.argv.includes('--check');
const sourceHash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const save = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const slug = value => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const inventory = readJson(path.join(workspace, 'COMPONENT-INVENTORY.json'));
const local = new Map(localCollection.map(c => [c.name, c]));
const licenseSource = path.join(workspace, 'react-bits/LICENSE.md');
const licenseTarget = path.join(root, 'public/licenses/react-bits-LICENSE.md');
if (!check) {
  fs.mkdirSync(path.dirname(licenseTarget), { recursive: true });
  fs.copyFileSync(licenseSource, licenseTarget);
}
assert.equal(sourceHash(licenseSource), sourceHash(licenseTarget));
const reused = [];
const selections = [
  ...['DepthLiftCard', 'PrismDeck', 'ConveyorGallery', 'KineticTiles', 'LiquidAction', 'OrbitStage', 'BeamPath', 'ApertureReveal', 'ScrollTheater']
    .map(name => [`react-bits/src/content/Components/${name}/${name}.jsx`, `src/vendor/${name}.jsx`]),
  ...['RippleButton', 'SpringAccordion', 'ElasticTabs', 'PaperNote', 'ArcadeButton']
    .map(name => [`react-bits/src/content/Micro/${name}/${name}.jsx`, `src/vendor/${name}.jsx`]),
  ['react-bits/src/content/TextAnimations/RotatingText/RotatingText.jsx', 'src/vendor/RotatingText.jsx'],
  ['aceternity/by-paradigm/01-static-visual/3d-card/components/ui/3d-card.tsx', 'src/vendor/3d-card.tsx'],
  ['aceternity/by-paradigm/01-static-visual/bento-grid/components/ui/bento-grid.tsx', 'src/vendor/bento-grid.tsx'],
  ['aceternity/by-paradigm/03-enter-exit/pointer-highlight/components/ui/pointer-highlight.tsx', 'src/vendor/pointer-highlight.tsx']
];
for (const [source, target] of selections) {
  const pairs = [[source, target]];
  if (source.endsWith('.jsx') && fs.existsSync(path.join(workspace, source.replace('.jsx', '.css'))))
    pairs.push([source.replace('.jsx', '.css'), target.replace('.jsx', '.css')]);
  for (const [from, to] of pairs) {
    if (!check) { fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true }); fs.copyFileSync(path.join(workspace, from), path.join(root, to)); }
    assert.equal(sourceHash(path.join(root, to)), sourceHash(path.join(workspace, from)), to);
    reused.push({ source: from, target: to, sha256: sourceHash(path.join(root, to)), adaptation: 'none; byte-identical copy' });
  }
}
const imageNames = ['DepthLiftCard', 'PrismDeck', 'ApertureReveal', 'OrbitStage', 'ScrollTheater', 'BeamPath', 'KineticTiles', 'ConveyorGallery', 'LiquidAction', 'ShutterText'];
for (const name of imageNames) {
  const from = path.join(workspace, `react-bits/output/local-collection/r3/${name}.png`);
  const to = path.join(root, `public/previews/${name}.png`);
  if (!check) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); }
  assert.equal(sourceHash(from), sourceHash(to));
}
const groups = { Animations: '交互动效', Backgrounds: '动态背景', Components: '内容组件', TextAnimations: '文字动画', Micro: '微交互' };
const acetGroups = { '01-static-visual': '布局与视觉', '02-css-keyframes': '循环动效', '03-enter-exit': '内容过渡', '04-svg-vector': '路径与光效', '05-motion-pipeline': '指针与弹簧', '06-scroll-driven': '滚动叙事', '07-canvas-2d': 'Canvas图像', '08-particles-engine': '粒子效果', '09-webgl-shader': '空间与材质' };
const entries = inventory.entries.map(c => {
  const id = `${c.library}-${slug(c.name)}`;
  const variants = {};
  if (c.library === 'react-bits') {
    for (const [variant, v] of Object.entries(c.variants)) variants[variant] = v.files.map(f => ({ name: path.basename(f.path), content: fs.readFileSync(f.path, 'utf8') }));
  } else variants['TS-TW'] = c.files.map(f => ({ name: path.basename(f.path), content: fs.readFileSync(f.path, 'utf8') }));
  const recipe = local.get(c.name);
  const payload = { name: c.name, library: c.library, variants, props: recipe?.props ?? [], usage: recipe?.usage ?? null,
    docs: c.docs ?? null, dependencies: c.declaredDependencies ?? [], attribution: c.library === 'aceternity' ? 'Aceternity UI' : c.origin === 'local' ? 'PULSAR local collection' : 'React Bits' };
  const payloadPath = path.join(root, `public/source/${id}.json`);
  if (check) assert.deepEqual(readJson(payloadPath), payload, `Source payload ${id}`);
  else save(payloadPath, JSON.stringify(payload));
  return { id, name: c.name, library: c.library, origin: c.origin, kind: c.kind,
    category: c.library === 'react-bits' ? groups[c.category] : acetGroups[c.category],
    description: c.description ?? null, style: c.style ?? null, tags: c.tags ?? [], docs: c.docs ?? null,
    variants: Object.keys(variants), preview: imageNames.includes(c.name) && c.library === 'react-bits' ? `/previews/${c.name}.png` : null,
    live: selections.some(([s]) => s.endsWith(`/${c.name}.jsx`)), featured: c.origin === 'local', sourceUrl: `/source/${id}.json` };
});
assert.equal(new Set(entries.map(c => c.id)).size, entries.length);
assert.equal(entries.length, Object.keys(componentMetadata).length + inventory.entries.filter(c => c.library === 'aceternity').length);
const catalog = { entries, totals: { entries: entries.length, local: localCollection.length, reactBits: Object.keys(componentMetadata).length, aceternity: entries.filter(c => c.library === 'aceternity').length } };
if (check) {
  assert.deepEqual(readJson(path.join(root, 'src/data/catalog.json')), catalog);
  assert.deepEqual(readJson(path.join(root, 'public/catalog.json')), catalog);
  assert.deepEqual(readJson(path.join(root, 'REUSE-MANIFEST.json')).files, reused);
}
else {
  save(path.join(root, 'src/data/catalog.json'), JSON.stringify(catalog));
  save(path.join(root, 'public/catalog.json'), JSON.stringify(catalog));
  save(path.join(root, 'REUSE-MANIFEST.json'), JSON.stringify({ firstAppearance: 'R5 / PULSAR multi-page website', componentCount: selections.length, files: reused }, null, 2));
}
console.log(JSON.stringify({ componentsCopied: selections.length, filesByteIdentical: reused.length, previewImagesIdentical: imageNames.length, licenseFilesIdentical: 1,
  catalogEntries: entries.length, sourcePayloadsEqual: entries.length, failed: 0, skipped: 0 }));
