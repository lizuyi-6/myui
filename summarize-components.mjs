import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { componentMetadata, VARIANTS } from './react-bits/src/constants/Information.js';
import { localCollection } from './react-bits/src/constants/LocalCollection.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const abs = p => path.resolve(root, p).replaceAll('\\', '/');
const read = p => fs.readFileSync(abs(p), 'utf8').replace(/^\uFEFF/, '');
const json = p => JSON.parse(read(p));
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(abs(p))).digest('hex');
const walk = dir => fs.readdirSync(abs(dir), { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const fingerprint = p => ({ path: abs(p), sha256: hash(p), mtime: fs.statSync(abs(p)).mtime.toISOString() });
const normalized = s => s.replaceAll('\r\n', '\n');
const local = new Map(localCollection.map(c => [c.name, c]));
const variantRoots = { 'JS-CSS': 'content', 'JS-TW': 'tailwind', 'TS-CSS': 'ts-default', 'TS-TW': 'ts-tailwind' };
const rows = [];
const allSourceFiles = [];
let registrySourceMatches = 0;

for (const [key, c] of Object.entries(componentMetadata).sort(([a], [b]) => a.localeCompare(b))) {
  // Existing metadata uses AsciiText as key while the public name is ASCIIText.
  assert.equal(key.toLowerCase(), `${c.category}/${c.name}`.toLowerCase());
  const variants = {};
  const imports = new Set();
  for (const variant of VARIANTS) {
    const ext = variant.startsWith('TS') ? 'tsx' : 'jsx';
    const dir = `react-bits/src/${variantRoots[variant]}/${c.category}/${c.name}`;
    const entry = `${dir}/${c.name}.${ext}`;
    assert.ok(fs.existsSync(abs(entry)), `Missing implementation: ${entry}`);
    const source = read(entry);
    const files = [entry];
    const css = `${dir}/${c.name}.css`;
    if (variant.endsWith('CSS') && fs.existsSync(abs(css))) files.push(css);
    for (const match of source.matchAll(/\bfrom\s+["']([^"']+)["']/g)) imports.add(match[1]);
    variants[variant] = { entry: abs(entry), files: files.map(fingerprint) };
    allSourceFiles.push(...files);
  }
  const recipe = local.get(c.name);
  rows.push({ id: `react-bits:${c.name}`, library: 'react-bits', origin: c.meta?.origin === 'local' ? 'local' : 'upstream',
    name: c.name, kind: 'component', category: c.category, description: c.description,
    style: recipe?.style ?? null, tags: c.tags, docs: c.docsUrl,
    declaredDependencies: recipe?.dependencies ?? null,
    sourceImportSpecifiers: [...imports].sort(), variants,
    runtimeEvidenceThisRound: 'not executed; inventory only' });
}
const registeredJS = rows.flatMap(c => [c.variants['JS-CSS'].entry]);
const actualJS = walk('react-bits/src/content').filter(p => p.endsWith('.jsx')).map(abs);
assert.deepEqual([...registeredJS].sort(), [...actualJS].sort(), 'Unregistered or missing JS-CSS entries');

const api = json('aceternity/_meta/components-api.json');
const apiItems = ['components', 'blocks', 'hooks'].flatMap(kind => api[kind].map(c => ({ ...c, kind })));
const download = json('aceternity/_meta/download_results.json');
const downloadedNames = new Set();
const acetMetas = walk('aceternity/by-paradigm').filter(p => p.endsWith('/component.json')).sort();
for (const metadata of acetMetas) {
  const c = json(metadata);
  const a = apiItems.find(i => i.name === c.name && i.kind === c.kind);
  assert.ok(a, `Unlisted download: ${c.name}`);
  assert.ok(!downloadedNames.has(c.name), `Duplicate download: ${c.name}`);
  downloadedNames.add(c.name);
  const dir = path.posix.dirname(metadata);
  const registryPath = `aceternity/_meta/registry/${c.name}.json`;
  const registry = json(registryPath);
  const files = c.files.map(p => `${dir}/${p.replaceAll('\\', '/')}`);
  const imports = new Set();
  for (const p of files) {
    assert.ok(fs.existsSync(abs(p)), `Missing downloaded file: ${p}`);
    const registryFile = registry.files.find(f => (f.path || f.target).replaceAll('\\', '/') === p.slice(dir.length + 1));
    assert.ok(registryFile?.content, `Missing registry source: ${p}`);
    assert.equal(normalized(read(p)), normalized(registryFile.content), `Download differs from registry snapshot: ${p}`);
    registrySourceMatches++;
    for (const match of read(p).matchAll(/\bfrom\s+["']([^"']+)["']/g)) imports.add(match[1]);
  }
  allSourceFiles.push(...files);
  rows.push({ id: `aceternity:${c.name}`, library: 'aceternity', origin: 'download', name: c.name,
    title: a.title, kind: c.kind, category: c.paradigm, description: a.description,
    tags: a.categories, declaredDependencies: registry.dependencies ?? c.dependencies,
    registryDependencies: registry.registryDependencies ?? c.registryDependencies,
    docs: a.documentationUrl, sourceImportSpecifiers: [...imports].sort(),
    hostImportSpecifiers: [...imports].filter(i => i.startsWith('@/') || i.startsWith('next/')).sort(),
    metadata: fingerprint(metadata), registry: fingerprint(registryPath), files: files.map(fingerprint),
    runtimeEvidenceThisRound: 'not installed, compiled or executed; saved source snapshot only' });
}
assert.deepEqual([...downloadedNames].sort(), apiItems.map(c => c.name).sort(), 'API versus disk inventory differs');
assert.deepEqual([...downloadedNames].sort(), download.ok.map(c => c[0]).sort(), 'Download log versus disk differs');
assert.equal(download.fail.length, 0, 'Download log has recorded failures');

const libraryNames = new Set(rows.filter(c => c.library === 'react-bits').map(c => c.name));
const pulsar = walk('pulsar/src/components').filter(p => /\/([^/]+)\/\1\.jsx$/.test(p)).sort().map(p => {
  const name = path.basename(p, '.jsx');
  allSourceFiles.push(p);
  return { name, file: fingerprint(p), sameNameInLibrary: libraryNames.has(name),
    relationship: name === 'MotionGallery' ? 'page-specific composition' : 'trial implementation; same name does not imply identical code',
    runtimeEvidenceThisRound: 'not executed' };
});
const countBy = (list, key) => Object.fromEntries([...new Set(list.map(c => c[key]))].sort().map(k => [k, list.filter(c => c[key] === k).length]));
const rb = rows.filter(c => c.library === 'react-bits');
const ac = rows.filter(c => c.library === 'aceternity');
const summary = {
  libraryEntries: rows.length, reactBits: rb.length, reactBitsUpstream: rb.filter(c => c.origin === 'upstream').length,
  localOriginals: rb.filter(c => c.origin === 'local').length, reactBitsImplementations: rb.length * VARIANTS.length,
  reactBitsCategories: countBy(rb, 'category'), aceternity: ac.length,
  aceternityKinds: countBy(ac, 'kind'), aceternityParadigms: countBy(ac, 'category'),
  aceternitySourceFiles: registrySourceMatches, aceternityFilesMatchingSavedRegistry: registrySourceMatches,
  aceternityEntriesWithHostImports: ac.filter(c => c.hostImportSpecifiers.length > 0).length,
  pulsarModules: pulsar.length, pulsarSameNames: pulsar.filter(c => c.sameNameInLibrary).length,
  countedSourceFiles: allSourceFiles.length
};
assert.equal(new Set(rows.map(c => c.id)).size, rows.length);
assert.equal(summary.localOriginals, localCollection.length);
for (const kind of ['components', 'blocks', 'hooks']) assert.equal(summary.aceternityKinds[kind], api[kind].length);
for (const [key, kind] of [['totalComponents', 'components'], ['totalBlocks', 'blocks'], ['totalHooks', 'hooks']])
  assert.equal(summary.aceternityKinds[kind], api.stats[key]);
const sourceFingerprint = crypto.createHash('sha256').update([...new Set(allSourceFiles)].sort().map(p => `${p}\t${hash(p)}`).join('\n')).digest('hex');
const snapshot = { firstAppearance: 'R4 / 2026-09-30 / component inventory and taste summary',
  generatedAt: new Date().toISOString(), scope: abs('.'),
  countingRule: 'Library entries, including blocks/hook; four variants and PULSAR copies are not extra component names. Semantic overlap across libraries is retained, not deduplicated.',
  sourceFingerprint, summary, inputMetadata: ['react-bits/src/constants/Information.js', 'react-bits/src/constants/LocalCollection.js', 'aceternity/_meta/components-api.json', 'aceternity/_meta/download_results.json'].map(fingerprint),
  inventoryAssertions: { registeredReactBitsEntriesEqualDisk: true, aceternityApiNamesEqualDiskAndDownloadLog: true,
    savedAceternityRegistrySourceEqualDisk: true, libraryIdsUnique: true },
  runtimeAssertionsThisRound: 0, entries: rows, trialModules: pulsar };
fs.writeFileSync(abs('COMPONENT-INVENTORY.json'), JSON.stringify(snapshot, null, 2) + '\n');
const cell = s => String(s ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const link = p => `[源码](<${p}>)`;
const md = ['# 本地组件全量目录', '', `盘点范围：${abs('.')}。首次出现：R4 / 2026-09-30。`, '',
  `库目录条目 ${summary.libraryEntries}：React Bits ${summary.reactBits}（上游 ${summary.reactBitsUpstream} + 本地原创 ${summary.localOriginals}）；Aceternity ${summary.aceternity}（组件 ${summary.aceternityKinds.components} + 页面块 ${summary.aceternityKinds.blocks} + hook ${summary.aceternityKinds.hooks}）。`, '',
  `React Bits 四版本共 ${summary.reactBitsImplementations} 个实现；PULSAR ${summary.pulsarModules} 个源码模块，其中 ${summary.pulsarSameNames} 个与库同名，另有 MotionGallery 页面编排。不加到库条目数。${summary.libraryEntries}条目不代表${summary.libraryEntries}种互不重叠的功能。`, '',
  `源码集合 SHA256：${sourceFingerprint}。逐文件 SHA/mtime、描述、依赖、四版本路径见 [机器目录](<${abs('COMPONENT-INVENTORY.json')}>)。`, '',
  '重现：在 X:/myui 执行 `node summarize-components.mjs`；脚本断言注册名==磁盘入口、API名==下载名==磁盘名、下载源码==保存的registry源码（仅统一换行符）。这些断言证明目录与快照对应，不证明运行行为。', '',
  '## 取用与计数边界', '',
  '- 优先从库目录取用，PULSAR 是带宿主主题的试验场。跨库同名项保留各自来源，不假定接口等价。',
  '- React Bits：JS-CSS / JS-TW / TS-CSS / TS-TW，CSS版同时复制相邻CSS。本地原创没有官网发布。',
  `- Aceternity：${summary.aceternitySourceFiles} 个落盘源码与保存的registry内容对应；${summary.aceternityEntriesWithHostImports} 项检测到 @/ 或 next/ 导入，取用时处理宿主别名、utils、Next环境和实际依赖。下载记录成功不等于安装/编译/交互通过。`,
  '- Aceternity九类是既有正则分类结果，不能直接当交互设计分类。例如3d-card被归到static-visual，但源码有鼠标驱动rotateX/rotateY。',
  '- 不把API中179个examples当作本地179个独立组件；本轮没有盘点付费模板和工作区外下载。', '',
  '## React Bits 全部目录', ''];
for (const category of Object.keys(summary.reactBitsCategories)) {
  const entries = rb.filter(c => c.category === category);
  md.push(`### ${category}（${entries.length}）`, '', '| 名称 | 来源 / 风格 | 用途（原元数据） | 入口 |', '| --- | --- | --- | --- |');
  for (const c of entries) md.push(`| ${c.name} | ${cell(c.origin === 'local' ? c.style : '上游')} | ${cell(c.description)} | ${link(c.variants['TS-CSS'].entry)} |`);
  md.push('');
}
md.push('## Aceternity 全部目录', '');
for (const paradigm of Object.keys(summary.aceternityParadigms)) {
  const entries = ac.filter(c => c.category === paradigm);
  md.push(`### ${paradigm}（${entries.length}）`, '', '| 名称 | 类型 | 用途（API元数据） | 入口 |', '| --- | --- | --- | --- |');
  for (const c of entries) md.push(`| ${c.title} / ${c.name} | ${c.kind} | ${cell(c.description)} | ${c.files.map(f => link(f.path)).join(' / ')} |`);
  md.push('');
}
md.push('## PULSAR 试验场源码', '', '| 名称 | 关系 | 入口 |', '| --- | --- | --- |');
for (const c of pulsar) md.push(`| ${c.name} | ${c.sameNameInLibrary ? '库中有同名项；不证明源码相同' : '页面编排'} | ${link(c.file.path)} |`);
md.push('', '## 未覆盖范围', '',
  `本轮只做目录/源文件快照盘点，不运行组件行为测试、build、tsc、完整lint或独立安装。不重新认证R2/R3历史结果。未逐项人工读完${rows.length + pulsar.length}个条目/模块，不检查全部props、资源可达性、许可证适用方式、宿主适配、空值/错误分支、SSR、触摸、Safari、无障碍及性能。导入扫描仅识别from字符串，不代表完整依赖解析。工作区外Downloads等路径未扫描。`, '',
  '## 本轮文档可能引入的新风险', '',
  '目录是当前快照，增删组件后必须重跑；跨库相似能力保留两个条目，不能拿总数当独立功能数；范式正则分类和API描述可能过于粗糙，选用前读真实接口；偏好与页面方案在DESIGN-PREFERENCES.md分开标记原话、历史记录、设计推断。');
fs.writeFileSync(abs('COMPONENT-INVENTORY.md'), md.join('\n') + '\n');
const generatedMarkdown = read('COMPONENT-INVENTORY.md');
let entryRows = 0;
for (const c of rows) {
  assert.ok(generatedMarkdown.includes(c.library === 'react-bits' ? `| ${c.name} |` : ` / ${c.name} |`));
  entryRows++;
}
let localLinks = 0;
for (const p of ['COMPONENT-INVENTORY.md', 'DESIGN-PREFERENCES.md']) {
  if (!fs.existsSync(abs(p))) continue;
  for (const match of read(p).matchAll(/\]\(<([A-Z]:\/[^>]+)>\)/g)) {
    assert.ok(fs.existsSync(match[1]), `Missing local document link: ${match[1]}`);
    localLinks++;
  }
}
let historicalGitFilesUnchanged = null;
if (process.argv.includes('--evidence')) {
  const oldFingerprints = json('react-bits/output/local-collection/r3/fingerprints.json');
  const oldMap = new Map(oldFingerprints.map(f => [f.file, f]));
  const oldSemantics = new Map(read('react-bits/MOTION-COLLECTION-EVIDENCE.md').split('\n')
    .filter(line => line.startsWith('| ')).map(line => { const cells = line.split(' | '); return [cells[0].slice(2), cells[1]]; }));
  const changed = execFileSync('git', ['-c', 'core.autocrlf=false', 'diff', '--name-only'],
    { cwd: abs('react-bits'), encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  historicalGitFilesUnchanged = 0;
  const report = ['# R4 组件盘点与偏好文档逐文件证据', '',
    '首次出现：R4 / 2026-09-30。状态：部分完成；目录事实有字段断言，组件运行能力本轮不重新认证。', '',
    '环境：Windows / Node 24.13.1 / X:/myui 当前源码；前置条件为React Bits注册元数据、Aceternity落盘快照及R3指纹文件。重现：`node summarize-components.mjs --evidence`。R3输出为本机忽略目录，缺失时不能重现历史SHA比较，脚本会报错；不以缺失时的猜测放行。', '',
    `库条目=${rows.length}，目录表行=${entryRows}；Aceternity文件内容与保存registry相等=${registrySourceMatches}；本地文档链接目标存在=${localLinks}。这些断言直接证明目录对应和链接存在，与待证命题是同一件事；runtimeAssertionsThisRound=0，不证明安装、交互或性能。`, '',
    `整个当前git diff文件=${changed.length}（包括R2/R3，未自行收窄）；本轮只修改其中AI-COMPONENTS.md、WORKLOG.md，其余逐文件与R3指纹比较。额外新增文件位于工作区根目录，单独列出。`, '',
    '## Git中的整个改动集', '', '| 文件 | 改动语义 | R4证据或明确未验证声明 |', '| --- | --- | --- |'];
  for (const file of changed) {
    if (file === 'AI-COMPONENTS.md') {
      for (const target of ['../COMPONENT-INVENTORY.md', '../COMPONENT-INVENTORY.json', '../DESIGN-PREFERENCES.md']) {
        assert.ok(read(`react-bits/${file}`).includes(target));
        assert.ok(fs.existsSync(path.resolve(abs('react-bits'), target)));
      }
      report.push(`| ${file} | 保留库取用约定，增加跨库盘点与偏好入口 | 3个相对链接文字和目标存在断言；未来AI是否遵循未验证 |`);
    } else if (file === 'WORKLOG.md') {
      assert.ok(read(`react-bits/${file}`).includes('## R4'));
      assert.ok(read(`react-bits/${file}`).includes('未覆盖范围'));
      report.push(`| ${file} | 追加R4事实、命令、失败、边界与文档风险 | R4段存在断言；统计见当前脚本输出；叙述不代替行为证据 |`);
    } else {
      assert.ok(oldMap.has(file), `No prior fingerprint for changed file: ${file}`);
      assert.equal(hash(`react-bits/${file}`), oldMap.get(file).sha256, `Changed since R3: ${file}`);
      historicalGitFilesUnchanged++;
      report.push(`| ${file} | ${oldSemantics.get(file) ?? '历史变更语义见R3报告'}（沿用R2/R3） | 本轮SHA==R3指纹；本轮未单独运行该文件行为，历史验证见MOTION-COLLECTION-EVIDENCE.md |`);
    }
  }
  report.push('', '## 工作区根目录新增产物', '', '| 文件 | 改动语义 | 证据或明确未验证声明 |', '| --- | --- | --- |');
  for (const [file, semantic, evidence] of [
    ['summarize-components.mjs', '可重现盘点脚本', '注册入口==磁盘；下载名==API==日志；保存registry内容==源码；没有行为测试'],
    ['COMPONENT-INVENTORY.json', '来源、源码、依赖、四版本、SHA/mtime机器目录', `${rows.length}个库ID唯一；源码集合SHA见目录；导入正则不是完整依赖解析`],
    ['COMPONENT-INVENTORY.md', '全量分类表与取用边界', `${entryRows}个条目逐项出现在表格；链接存在断言，不证明API语义`],
    ['DESIGN-PREFERENCES.md', '原话/历史偏好/设计推断与可选页面方向', '本地引用目标存在；个人审美判断未作用户确认或视觉验收']
  ]) {
    const f = fingerprint(file);
    report.push(`| ${file} | ${semantic} | ${evidence}；首次R4，mtime=${f.mtime}，SHA256=${f.sha256} |`);
  }
  report.push('| SUMMARY-EVIDENCE.md | 当前逐文件证据与边界 | git文件表行数等于当前diff文件数；自引用文档不独立证明行为，SHA可用Get-FileHash采集 |', '',
    `历史文件SHA相等=${historicalGitFilesUnchanged}/${changed.length - 2}。同一旧证据不提高完成度动词。`, '',
    '## 未覆盖范围', '',
    '没有重跑R2/R3浏览器、verifyMotionCollection/verifyLocalCollection/verifyInstalledCollection、checkPropDocs.test.js、build、tsc或完整lint；Aceternity未独立安装/编译/运行。没有逐项人工阅读全文、检查全部空值/错误/宿主别名/资源/SSR分支、许可证适用方式、Safari、真实触摸、无障碍或性能。工作区外组件下载未扫描。', '',
    '## 本轮改动可能引入的新风险', '',
    '目录快照会随下载过时；相似组件不等价；正则技术范式不等于实际交互；历史偏好不代表所有项目的新要求。来源、接口和推断分层用于限定这些风险。本轮源码无新变化的命题仅由上述SHA比较支持，不以旧绿套件推出新行为结论。');
  assert.equal(report.filter(line => changed.some(file => line.startsWith(`| ${file} |`))).length, changed.length);
  fs.writeFileSync(abs('SUMMARY-EVIDENCE.md'), report.join('\n') + '\n');
}
console.log(JSON.stringify({ ...summary, entryRows, localLinksExist: localLinks, historicalGitFilesUnchanged, sourceFingerprint, failed: 0, skipped: 0, runtimeAssertionsThisRound: 0 }));
