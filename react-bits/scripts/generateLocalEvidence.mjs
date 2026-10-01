import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { localCollection } from '../src/constants/LocalCollection.js';

const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
const browser=readJson('output/local-collection/browser.json');
const docs=readJson('output/local-collection/docs.json');
const registry=readJson('output/local-collection/registry.json');
const installed=readJson('output/local-collection/installed.json');
const watcher=readJson('output/local-collection/watch.json');
for(const [result,total] of [[browser,156],[docs,18],[registry,72],[installed,5],[watcher,1]]) {
  assert.equal(result.total,total);assert.equal(result.passed,total);assert.equal(result.failed,0);assert.equal(result.skipped,0);
}
assert.equal(browser.assertionResults.length,browser.assertions);
assert.equal(browser.assertionResults.every(row=>row.passed),true);
assert.equal(browser.errors.length,0);assert.equal(docs.errors.length,0);
const diff=execFileSync('git',['diff','--name-only'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split(/\r?\n/).filter(Boolean).sort();
const files=[...new Set(diff)];
const variants={content:0,tailwind:1,'ts-default':2,'ts-tailwind':3};
const description=file=>{
  const implementation=file.match(/^src\/(content|tailwind|ts-default|ts-tailwind)\/[^/]+\/([^/]+)\/[^/]+\.(jsx|tsx|css)$/);
  if(implementation) {
    const [,directory,name,extension]=implementation;
    const rows=browser.rows.filter(row=>row.component===name&&row.variant===variants[directory]);
    assert.equal(rows.length>=1,true,`${file}: no behavior evidence`);
    assert.equal(rows.every(row=>row.passed),true);
    return [`${name} ${directory} ${extension==='css'?'命名样式':'独立实现/props/事件与动态'}`,`verifyLocalCollection.cjs：component=${name}, variant=${variants[directory]}，${rows.length}/${rows.length} 工况；${extension==='css'?'12项 computed style/390px 根边界与 CSS 配对':'具体 UI/回调字段断言'}${extension==='tsx'?'；tsc -p tsconfig.local-collection.json exit 0，该文件列于 files':''}`];
  }
  const demo=file.match(/^src\/demo\/[^/]+\/([^/]+)Demo\.jsx$/);
  if(demo){assert.equal(docs.rows.find(row=>row.component===demo[1])?.passed,true);return [`${demo[1]} 独立库文档示例/参数表/代码页`,`verifyLocalDocs.cjs：${demo[1]} production preview、props、source、usage 字段；未逐项操作 Customize 控件`];}
  const code=file.match(/^src\/constants\/code\/[^/]+\/(.+)Code\.js$/);
  if(code){const item=localCollection.find(item=>item.name[0].toLowerCase()+item.name.slice(1)===code[1]);assert.equal(Boolean(item),true);return [`${item.name} 五份 raw 源码、使用示例与依赖`,`checkLocalCollection.mjs：raw imports==5、dependencies=='motion'；verifyLocalDocs.cjs 实际函数/usage import 呈现`];}
  if(file.startsWith('public/r/')&&file!=='public/r/registry.json'){const row=registry.rows.find(row=>row.file===file);assert.equal(row?.passed,true);return [`${row.component} ${row.variant} 安装包`,`checkLocalRegistry.mjs：content==source、target==@components/文件名、motion依赖、origin=='local'、索引计数==1`];}
  const specific={
    '.gitignore':['忽略开发调用方与证据输出，保留可复用 AGENTS','git check-ignore output/local-collection/browser.json 返回匹配；报告/AGENTS 出现在 git diff；非运行逻辑'],
    'AGENTS.md':['后续 AI 的组件复用入口','人工核对源码/指南路径；不单独验证未来 AI 是否遵循文字约定'],
    'AI-COMPONENTS.md':['18种风格、四版本、参数/取用/本地安装说明','目录项与 LocalCollection 比对；ArcadeButton 安装实例 5/5；未单独验证所有文档示例/安装器版本'],
    'README.md':['入口链接与本地未发布说明','相对 AI-COMPONENTS.md 目标存在；纯文档未单独做浏览器链接点击'],
    'WORKLOG.md':['做了/没做/失败/风险与复现账本','generateLocalEvidence.mjs 从实际 JSON 断言统计；记录未覆盖范围；文字不替代行为证据'],
    'LOCAL-COLLECTION-EVIDENCE.md':['本轮逐文件证据','generateLocalEvidence.mjs：表行数==git diff --name-only 文件数；自引用文档指纹另存 fingerprint JSON'],
    'package.json':['registry build 串联规范化','npm run build exit 0；registry 916 items；checkLocalRegistry.mjs 72/72 载荷及原844无diff'],
    'jsrepo.config.ts':['本地新增项的 CSS/源码相邻 target','registry:build exit 0；72包 target字段；真实安装 ArcadeButton-TS-CSS 两文件与5/5独立行为'],
    'public/llms.txt':['新增18项 AI 目录、独立源码路径与未发布标记','checkLocalRegistry.mjs：18条本地目录与安装URL存在；git diff仅18新增目录行'],
    'public/r/registry.json':['新增72项索引及本地来源','checkLocalRegistry.mjs：每个新名称出现次数==1；所有新包 origin/target/source 字段；旧844载荷无diff'],
    'scripts/checkPropDocs.test.js':['Windows fixture根目录解析','npm run test:prop-docs exit 0，三个原名函数3/3，failed/skipped/cancelled/todo均0；基线3项1失败'],
    'scripts/generateLlmsText.js':['生成本地 AI 文档路径/来源提示','npm run build exit 0；生成 public/llms.txt 的18项路径由 checkLocalRegistry.mjs 断言'],
    'scripts/generateRouteMeta.js':['本地组件 canonical 使用实际 docsUrl','npm run build exit 0；checkLocalRegistry.mjs：18项 dist canonical==本地URL'],
    'scripts/generateRss.js':['官方RSS排除尚未发布的本地新增项','npm run build exit 0；checkLocalRegistry.mjs：dist/rss.xml 中本地新增 guid 数==0；未扩大到全RSS语义审计'],
    'scripts/normalizeRegistry.mjs':['LF/稳定文件顺序与本地来源恢复','checkLocalRegistry.mjs：旧844包无diff、新72包源码完全相等/来源匹配；正常watch 1/1；异常分支未注入'],
    'scripts/watchRegistry.js':['监听本地元数据、成功后规范化','watch.json：metadata-only修改后 after_ticks>before_ticks 且 origin==local，1/1；失败及queued分支未验证'],
    'src/constants/Categories.js':['分类中追加本地18项','checkLocalCollection.mjs：catalog每项出现次数==1，check:prop-docs 229项；production routes 18/18'],
    'src/constants/Components.js':['合并本地惰性路由','checkLocalCollection.mjs：18个路由键存在；production demo 18/18'],
    'src/constants/Information.js':['合并本地 metadata','checkLocalCollection.mjs：18项 origin==local；本地文档/registry字段检查'],
    'src/constants/LocalCollection.js':['机器可读风格/标签/API/路径/来源目录','checkLocalCollection.mjs 18唯一catalog；229表默认值；checkLocalRegistry.mjs 72包/18文档/LLM路径；非标量使用示例未逐项单独执行'],
    'src/constants/LocalComponents.js':['18份惰性 demo imports','verifyLocalDocs.cjs：所有18个生产路由实际渲染；缺失lazy import会使marker断言失败'],
    'scripts/generateLocalCollection.mjs':['生成72源码、18demo/code及注册目录','本轮生成后 parse/parity 72/72、CSS pairs18/18、严格TS36、默认值229表与browser156/156；未测试任意未来定义输入'],
    'scripts/createCollectionFixture.mjs':['隔离的正常受控/非受控测试调用方','其真实生成物承载 verifyLocalCollection.cjs 156/156；非生产组件钩子'],
    'scripts/createInstalledFixture.mjs':['真实安装项目无主题调用方','其生成物通过 verifyInstalledCollection.cjs 5/5；无需库文档页面或Tailwind'],
    'scripts/checkLocalCollection.mjs':['独立性/源码解析/四版本逻辑与CSS同步断言','node scripts/checkLocalCollection.mjs exit0，72/72/18pairs；断言字段见脚本，非运行行为结论'],
    'scripts/checkLocalRegistry.mjs':['载荷/目标/来源/原包/安装/canonical断言','node scripts/checkLocalRegistry.mjs exit0，72/72，旧844无diff，CLI2/2，本地canonical18/18'],
    'scripts/verifyLocalCollection.cjs':['组件真实行为检查与字段记录','CLI JSON门禁 exit0，156/156，891字段断言，failed/skipped/pageerrors均0'],
    'scripts/verifyLocalDocs.cjs':['生产文档预览/源码/参数呈现检查','CLI JSON门禁 exit0，18/18，failed/skipped/pageerrors均0；UI层而非后端/持久化'],
    'scripts/verifyInstalledCollection.cjs':['独立CLI安装实例的样式/回调检查','CLI JSON门禁 exit0，5/5，含背景/字体/counter1/counter2/pageerrors0字段'],
    'scripts/generateLocalEvidence.mjs':['本报告与证据指纹/变更集生成','本次执行所有JSON门禁、逐文件匹配和表行数断言；未编写独立单测，自身不产生新的行为证据'],
    'tsconfig.local-collection.json':['严格类型检查覆盖36个本轮TS文件','npx tsc -p tsconfig.local-collection.json exit0，无诊断；既有其他TS文件未纳入']
  };
  if(file.startsWith('scripts/local-collection/'))return ['四种实现共用的组件/样式/API定义源','生成物对应 parse/parity 72/72、TS36无诊断、prop-default一致及browser156/156；未对私有模板函数单独单测'];
  return specific[file]??['未分类改动','未单独验证，需人工核对；套件结果不证明此文件语义'];
};
const rows=files.map(file=>({file,...Object.fromEntries(description(file).map((value,index)=>[index?'evidence':'semantics',value]))}));
assert.equal(rows.some(row=>row.evidence.startsWith('未单独验证，需人工核对')),false,'unclassified changed file');
const text=`# R2 逐文件证据\n\n首次产生：2026-09-30 本轮组件库扩展；变更集合锚定 git diff --stat / git diff --name-only，${files.length} 文件。环境与命题映射、命令退出码、测试前置/未覆盖范围/本轮新风险详见 WORKLOG.md。此报告不给出未覆盖环境的可用态结论。\n\n表中 CLI 数字指解析 JSON 后的字段门禁；仅进程启动/HTTP成功不计行为证据。\n\n| 改动文件 | 改动语义 | 针对该语义的证据或明确缺口 |\n| --- | --- | --- |\n${rows.map(row=>`| ${row.file} | ${row.semantics} | ${row.evidence} |`).join('\n')}\n\n每份产物 SHA-256 与 mtime 另存 output/local-collection/fingerprints.json（含本报告本身，避免自引用哈希循环）。该文件与原始检查 JSON 仅为本轮本机记录；源码/本报告/账本进入 git diff。UI 风格截图不是行为、后端或权限证据。\n`;
fs.writeFileSync('LOCAL-COLLECTION-EVIDENCE.md',text);
fs.writeFileSync('output/local-collection/change-stat.txt',execFileSync('git',['diff','--stat'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}));
const artifacts=[...files,'output/local-collection/browser.json','output/local-collection/docs.json','output/local-collection/registry.json','output/local-collection/installed.json','output/local-collection/watch.json','output/local-collection/build.final.log'];
const fingerprints=artifacts.map(file=>({file,firstAppearance:'R2 2026-09-30 component-library expansion',mtime:fs.statSync(file).mtime.toISOString(),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}));
fs.writeFileSync('output/local-collection/fingerprints.json',JSON.stringify(fingerprints,null,2));
assert.equal((text.match(/^\| (?!---|改动文件)/gm)??[]).length,files.length);
console.log(`changed_files=${files.length}; evidence_rows=${rows.length}; fingerprints=${fingerprints.length}; browser_cases=${browser.passed}/${browser.total}; assertion_fields=${browser.assertions}; docs=${docs.passed}/${docs.total}; install_fields=${installed.passed}/${installed.total}; watch=${watcher.passed}/${watcher.total}`);
