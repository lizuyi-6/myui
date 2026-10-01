import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const json = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const output = 'output/playwright';
const reports = Object.fromEntries(['behavior','demos','layout','assets'].map(name => [name,json(`${output}/${name}-pass.json`)]));
const totals = { behavior:25,demos:15,layout:42,assets:731 };
for(const [name,report] of Object.entries(reports)) {
  assert.equal(report.total,totals[name]);
  assert.equal(report.passed,report.total);
  assert.equal(report.failed,0);
  assert.equal(report.skipped,0);
  assert.equal((report.errors ?? []).length,0);
  if(report.assertions) assert.ok(report.assertions.every(row=>row.passed && JSON.stringify(row.actual)===JSON.stringify(row.expected)));
  assert.ok((report.rows ?? report.results).every(row=>row.passed));
}
assert.ok(reports.layout.results.every(row=>row.scroll<=row.client+1 && row.controls===0));
const reuse = JSON.parse(fs.readFileSync(`${output}/reuse-final.log`,'utf8').trim().split(/\r?\n/).at(-1));
assert.equal(reuse.componentsCopied,18);assert.equal(reuse.filesByteIdentical,33);
assert.equal(reuse.catalogEntries,361);assert.equal(reuse.sourcePayloadsEqual,361);
assert.equal(reuse.failed,0);assert.equal(reuse.skipped,0);
const prerender=json(`${output}/prerender.json`);
assert.equal(prerender.total,369);assert.equal(prerender.failed,0);assert.equal(prerender.skipped,0);
assert.ok(fs.readFileSync(`${output}/build-final.log`,'utf8').includes('prerendered=369; pages=8; componentDetails=361; failed=0; skipped=0'));
const catalog=json('src/data/catalog.json');
assert.equal(catalog.entries.length,361);
assert.deepEqual(json('public/catalog.json'),catalog);
const manifest=json('REUSE-MANIFEST.json');
for(const item of manifest.files) {
  assert.equal(hash(item.target),item.sha256);
  assert.equal(hash(path.resolve('..',item.source)),item.sha256);
}
assert.equal(hash('public/licenses/react-bits-LICENSE.md'),hash('../react-bits/LICENSE.md'));
const packageJson=json('package.json'),lock=json('package-lock.json');
assert.deepEqual(lock.packages[''].dependencies,packageJson.dependencies);
assert.deepEqual(lock.packages[''].devDependencies,packageJson.devDependencies);
const files=execFileSync('git',['diff','--name-only','-z'],{encoding:'utf8'}).split('\0').filter(Boolean).sort();
assert.ok(files.length>400);
const behaviors=reports.behavior.rows.map(row=>row.name);
const getWorkflow=pattern=>behaviors.filter(name=>pattern.test(name)).join('; ');
const evidenceFor=file=>{
  if(file.startsWith('src/vendor/')) {
    const original=manifest.files.find(row=>row.target===file);
    assert.ok(original,`Unaccounted vendor: ${file}`);
    const name=path.basename(file).replace(/\.(jsx|tsx|css)$/,'');
    const demo=reports.demos.rows.find(row=>row.name===name);
    return `原库副本：SHA(${file}) == SHA(${original.source}) == ${original.sha256}; ${demo ? `demo ${name}: ${demo.assertions} 个字段断言` : '首页 UI 组合渲染与布局采样'}。${file.endsWith('.css') ? 'CSS 各条规则未逐项单独断言' : '所有可选参数和失败分支未单独验证'}。`;
  }
  if(file.startsWith('public/source/')) {
    const row=reports.assets.rows.find(row=>row.file===file);assert.ok(row?.passed);
    return `真实源包快照：check:reuse deepEqual(磁盘 JSON, 原库读入的 variants/props/dependencies); HTTP JSON == 磁盘 JSON（${row.bytes} bytes）。不证明组件运行行为。`;
  }
  if(file.startsWith('public/previews/')) {
    const source=`../react-bits/output/local-collection/r3/${path.basename(file)}`;
    assert.equal(hash(file),hash(source));
    return `沿用 R3 实拍图：SHA(本站文件) == SHA(${source}) == ${hash(file)}。不作为 R5 动效行为证据。`;
  }
  const specific={
    'src/App.jsx':`共享导航、路由与动效开关：${getWorkflow(/motion pause|mobile menu|404|separate|docs/)}。`,
    'src/main.jsx':'客户端启动与物理页面匹配：369 个 HTTP body == 对应文件；42 个 Chromium 路由/宽度采样未捕获 pageerror。未逐个浏览器加载全部 369 地址。',
    'src/entry-server.jsx':'服务端渲染：prerender total == 369、h1 存在、data-route == 地址；HTTP body SHA == 对应文件 SHA。',
    'src/context.jsx':`会话主题、便笺、点击与 reduced-motion：${getWorkflow(/draft|counter|callback|theme|reduced/) }。刷新持久化未提供。`,
    'src/Demo.jsx':'15 个真实演示挂载：demos total == passed == 15；真实子节点宽度 > 0、data-ready == true 且 inert == false；缺失客户端脚本时便笺 inert == true 且不能取得焦点；恢复后输入只含新文本。全部参数未覆盖。',
    'src/ui.jsx':`组件化导航按钮及文字链接：${getWorkflow(/FAQ|404|docs/)}；Brand/Closing 像素仅见本轮截图，未逐个单独断言。`,
    'src/styles.css':'整体排版和主题样式：42 个宽度/路由字段断言 scrollWidth <= clientWidth + 1、未命名可见按钮 == 0；主题背景颜色字段断言。未逐条覆盖 CSS 规则。',
    'src/lib/utils.ts':'Aceternity 所需 cn 工具；进入构建，首页 Bento 组合渲染。未单独验证，理由=无 cn 输入矩阵测试，构建不证明 class 冲突合并语义。',
    'src/pages/Home.jsx':`产品首屏与模块组合：${getWorkflow(/homepage|motion pause|Conveyor|FAQ/)}；R5 首页截图仅证明 UI。`,
    'src/pages/Catalog.jsx':`目录搜索、分类、来源、分页与 URL：${getWorkflow(/filter|search|pagination|catalog download/)}。`,
    'src/pages/Detail.jsx':`真实源码、参数、下载与异常恢复：${getWorkflow(/source|clipboard|download|brief|props|Acet/)}；503 注入触发 alert、AI 按钮 disabled，并恢复真实源包。`,
    'src/pages/Styles.jsx':`四主题、便笺和按钮体验：${getWorkflow(/styles|draft|callback|counter/)}。`,
    'src/pages/Docs.jsx':`四个指南地址及目录下载：${getWorkflow(/docs|catalog download/)}；许可原文 SHA 比对。许可链接未做点击下载专项测试。`,
    'src/pages/About.jsx':'产品介绍与 BeamPath 组合：about 物理 HTML == HTTP body；3 个宽度布局采样；BeamPath 演示字段断言；介绍文案未做行为测试。',
    'src/pages/NotFound.jsx':`未知地址恢复：${getWorkflow(/404/)}；没有 HTTP 404 状态承诺。`,
    'src/data/catalog.json':'生成给网站用的 361 项目录：deepEqual(网站目录,原库读取结果); public/catalog.json == src/data/catalog.json；来源过滤计数断言。',
    'public/catalog.json':'AI 目录下载：HTTP JSON == 磁盘 JSON；下载文件 entries.length == 361。',
    'REUSE-MANIFEST.json':'33 个目标逐文件 SHA == 原库 SHA；18 个选择存在。此处是字节一致性，不是全库运行结论。',
    'public/licenses/react-bits-LICENSE.md':'许可原文：SHA(本站文件) == SHA(原庫 LICENSE.md)。不构成再分发授权证明。',
    'public/favicon.svg':'静态品牌图标进入 dist；浏览器截图显示页面主体。未单独验证，理由=未做图标视觉断言。',
    'index.html':'中文语言、入口与元数据：build 与 369 个物理 HTML 断言；未做搜索引擎收录验证。',
    'vite.config.js':'独立 HTML 预览路由：首次 368 个子地址回退首页，修正后 369/369 body SHA == 物理文件 SHA；不证明远程托管行为。',
    'package.json':'项目脚本与锁定依赖：npm install 退出 0；build/check:reuse/check:assets/check:browser/evidence 实际命令；依赖字段 == lock 根包字段。',
    'package-lock.json':'安装锁文件：dependencies/devDependencies == package.json；npm install 退出 0。未做其他 OS 的 npm ci。',
    '.gitignore':'隔离依赖、构建和证据输出；git check-ignore 指定输出与 node_modules；不改变源文件跟踪。',
    '.gitattributes':'字节保留策略：git check-attr text 对 vendor 与源包返回 unset；不做工作副本换行转换。未单独验证其他 Git 客户端。',
    'scripts/sync-library.mjs':'同步和逐文件校验：check:reuse 输出 copied == 18、byteIdentical == 33、payloadEqual == 361、failed == skipped == 0。',
    'scripts/prerender.mjs':'逐地址 HTML 生成：rows.length == 8 + catalog.entries.length == 369，h1 与 data-route 字段断言。',
    'scripts/check-site-assets.mjs':'HTTP 数据一致性检查：731/731，真实端点 body/JSON == 磁盘产物。首次错误检查保留。',
    'scripts/verify-site.cjs':'浏览器工作流：25/25，具体 assertions.actual == expected；包含真实同端点 503 故障注入。',
    'scripts/verify-demos.cjs':'15/15 演示挂载及六类附加交互状态；具体 assertions.actual == expected。',
    'scripts/check-layout.cjs':'14 路由 × 3 宽度 = 42；scroll <= client + 1 且 controls == 0。',
    'scripts/run-browser-checks.mjs':'npm run check:browser 退出 0，读取 total/failed/skipped/errors；三个 suite 合计 82/82。',
    'scripts/capture-site.cjs':'captured images.length == 8，图片文件存在；初次会话未打开、二次选择器错误记录保留。只证明 UI 截图取得。',
    'scripts/collect-site-evidence.mjs':'npm run evidence 读取上述具体字段，逐文件计算 SHA；证据行数 == git diff 文件数。不是新增组件行为测试。',
    'README.md':'使用说明与范围：内容字段、依赖与脚本锚点存在，人工读稿；文档无独立行为测试。',
    'AGENTS.md':'未来 AI 取用约定：内容留存，人工读稿；不能证明未来模型遵循规则。',
    'WORKLOG.md':'R5 做了什么/未覆盖范围及失败账本：内容留存，人工读稿；不能替代具体断言。',
    'SITE-EVIDENCE.md':'本轮报告：由本脚本生成，逐文件行数 == git diff 文件数；报告本身不新增行为覆盖。'
  };
  assert.ok(specific[file],`Missing per-file evidence: ${file}`);
  return specific[file];
};
const rows=files.map(file=>({file,evidence:evidenceFor(file)}));
assert.equal(rows.length,files.length);
assert.equal(execFileSync('git',['check-ignore','output/playwright/behavior-pass.json','node_modules/react/package.json'],{encoding:'utf8'}).trim().split(/\r?\n/).length,2);
assert.ok(execFileSync('git',['check-attr','text','--','src/vendor/PrismDeck.jsx','public/source/react-bits-prism-deck.json'],{encoding:'utf8'}).trim().split(/\r?\n/).every(line=>line.endsWith(': text: unset')));
const captured=json(`${output}/captures.json`);
assert.equal(captured.images.length,8);assert.ok(captured.images.every(row=>fs.existsSync(row.path)));
const table=rows.map(row=>`| ${row.file} | ${row.evidence.replaceAll('|','\\|')} |`).join('\n');
const report=`# R5 / PULSAR 官网证据\n\n环境：Windows 本地，Node ${process.version}，Chromium，Vite production preview http://127.0.0.1:5300。前置：同工作区原库与库存快照存在，预览服务运行。仅本地范围，未部署、未公开发布。\n\n命题映射：源码 SHA 相同证明“直接复用”；DOM/状态断言证明对应流程；369 个 HTTP body == 物理文件证明每个已列地址返回自己的 HTML。它们不证明全部组件、所有宿主、跨浏览器或公开分发授权。\n\n## 本轮实际结果\n\n| 命令 | 退出码 | 结果 |\n| --- | --- | --- |\n| npm run build | 0 | 8 主页面 + 361 详情 = 369 个物理 HTML；SSR h1/data-route 断言 |\n| npm run check:reuse | 0 | 18 组件、33 源码逐字节相同；10 R3 图相同；361 源包相同；许可原文相同；failed=0 skipped=0 |\n| npm run check:assets | 0 | total=731 passed=731 failed=0 skipped=0，HTTP 真实 body/JSON 一致性 |\n| npm run check:browser | 0 | 工作流 25/25 + 演示 15/15 + 布局 42/42；total=82 failed=0 skipped=0；pageerrors=[] |\n| npm run evidence | 0 | 上述字段闸门；逐文件 ${files.length} 行映射和 SHA/mtime |\n\n工作流字段断言 ${reports.behavior.assertions.length} 条；演示字段断言 ${reports.demos.assertions.length} 条。每条实际值与预期值保存在 output/playwright。源包、许可与复用身份不等于所有交互已经测过。\n\n## 早期失败保留\n\n行为首次 25/17/8，第二次 25/24/1；布局首次 28/27/1；源包 JSON 比对失败；物理 HTML HTTP 首次 731/363/368；抓图会话与选择器失败。见 WORKLOG.md 与 output/playwright/*first*、behavior-final.json、captures-second-failed.log。用例未减少、failed 没有改名为 skipped。Windows 剪贴板仅做 CRLF/LF 标准化比较；下载文件仍检查真实内容。\n\n## 未覆盖范围（本轮未触及的相关路径/测试/分支）\n\n- 346 个仅收录源码的详情没有运行时演示测试；未完整阅读其中全部实现。现有 15 个演示没有覆盖所有参数、长文本、空内容、多实例和全部失败分支。\n- 本轮执行 verify-site.cjs / verify-demos.cjs / check-layout.cjs；没有执行兄弟组件库的全库端到端或单元套件，既有 R3 测量不作为 R5 新测量。\n- 源包 503 → alert/disabled/retry 分支实测；剪贴板拒绝、网络断开、无效 JSON、Abort 路由竞态没有专项用例；全部 369 地址没有逐个浏览器 hydration 检查，HTTP HTML 一致性不证明浏览器行为。\n- 未覆盖 Safari、Firefox、真机触摸、屏幕阅读器、GPU/FPS/Core Web Vitals、公开托管/子路径部署。\n- 未提供账户、支付、远程保存；便笺与点击只保存在当前 SPA 会话。来源许可文件只是原文，不是授权结论。\n\n## 本轮改动可能引入的新风险\n\n范围锚：git diff --stat 全量 ${files.length} 个文件，详见 output/playwright/git-diff-stat.txt。源码快照可能随原库更新过时；SSR 与客户端状态可能出现未采样差异；具体托管服务需要按物理目录配置；复制多个动效实例可能增加渲染成本；会话内容刷新丢失；全量源包公开分发要独立核对许可。6 个共享/动态导入构建警告保留，没有 FPS 或性能达标结论。\n\n## 每个改动文件与对应证据\n\n| 文件 | 改动语义与证据 / 限制 |\n| --- | --- |\n${table}\n`;
const additionalScope = '- 相关未运行检查：`../react-bits/scripts/checkPropDocs.test.js`、`checkLocalCollection.mjs`、`checkLocalRegistry.mjs`。检索命令：`rg --files ../react-bits -g "*test*" -g "*check*" -g "!node_modules/**" -g "!dist/**" -g "!output/**"`。\n- 相关实现未做完整语义复查：`../react-bits/src/ts-default/Components/PrismDeck/PrismDeck.tsx`、`../react-bits/src/content/Backgrounds/Aurora/Aurora.jsx`。源码收录读取不等于语义审阅。\n- 503 注入使用 Playwright `page.route` 拦截同一个源码请求，钩子不进入生产构建。此证据证明浏览器消费层拒绝失败响应与恢复，不证明服务器真实故障或服务端可用性。\n\n';
const hydrationHistory='末轮初始化竞态 25/24/1 原样保留为 `behavior-hydration-failed.json`。SSR 互动子树在客户端初始化前保持 inert，实际阻断 JS 后断言 `inert == true`、`activeElement != textarea`，恢复 JS 后断言输入值与跨页状态。该钩子同样仅在测试工具中拦截请求，没有加入生产源码。\n\n';
fs.writeFileSync('SITE-EVIDENCE.md',report.replace('## 未覆盖范围',hydrationHistory+'## 未覆盖范围').replace('## 本轮改动可能引入的新风险',additionalScope+'## 本轮改动可能引入的新风险'));
fs.writeFileSync(`${output}/git-diff-stat.txt`,execFileSync('git',['diff','--stat'],{encoding:'utf8',maxBuffer:1024*1024}));
const fingerprints=files.map(file=>({file:absolute(file),sha256:hash(file),mtime:fs.statSync(file).mtime.toISOString(),firstAppearance:'R5 / 2026-09-30 / multi-page website'}));
function absolute(file){return path.resolve(file).replaceAll('\\','/');}
fs.writeFileSync(`${output}/fingerprints.json`,JSON.stringify({round:'R5',files:fingerprints},null,2));
fs.writeFileSync(`${output}/per-file-evidence.json`,JSON.stringify(rows,null,2));
console.log(JSON.stringify({files:files.length,browserCases:82,assetCases:731,sourcePayloads:361,failed:0,skipped:0}));
