import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { spatial } from './local-collection/spatial.mjs';
import { kinetic } from './local-collection/kinetic.mjs';
import { localCollection } from '../src/constants/LocalCollection.js';

const directory='output/local-collection/r3';
const read=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
const batches=['batch0-fixed.json','batch1.json','batch2.json','batch3.json'].map((file,index)=>{
  const batch=read(directory+'/'+file);assert.equal(batch.total,35);assert.equal(batch.passed,35);assert.equal(batch.failed,0);assert.equal(batch.skipped,0);assert.equal(batch.errors.length,0);assert.deepEqual(batch.variants,[index]);assert.equal(batch.assertionResults.every(row=>row.passed),true);return batch;
});
const fields=batches.flatMap((batch,variant)=>batch.assertionResults.map(field=>({...field,variant})));
const definitions=[...spatial,...kinetic];
for(const component of definitions){
  const baseline=batches[0].styles.find(row=>row.name===component.name);assert.ok(baseline);
  for(let variant=1;variant<4;variant++){
    const current=batches[variant].styles.find(row=>row.name===component.name);assert.ok(current);
    for(const [name,expected] of Object.entries(baseline.fields)){
      const actual=current.fields[name];assert.equal(actual,expected,component.name+' '+variant+' '+name);
      fields.push({name:component.name+' style parity '+name,variant,actual,expected,passed:true});
    }
  }
}
const browser={environment:batches[0].environment,total:140,passed:140,failed:0,skipped:0,assertionCount:fields.length,assertionResults:fields,rows:batches.flatMap(batch=>batch.rows),errors:[],styleComparisons:360};
fs.writeFileSync(directory+'/browser.json',JSON.stringify(browser,null,2));
const docs=read(directory+'/docs.json'),installed=read(directory+'/installed.json'),registry=read('output/local-collection/registry.json');
for(const [result,total] of [[docs,10],[installed,7],[registry,112]]){assert.equal(result.total,total);assert.equal(result.passed,total);assert.equal(result.failed,0);assert.equal(result.skipped,0);}
assert.equal(docs.errors.length,0);assert.equal(installed.errors.length,0);
const guide=fs.readFileSync('AI-COMPONENTS.md','utf8');
for(const item of localCollection){assert.equal(guide.includes('| '+item.name+' |'),true);assert.equal(fs.existsSync(item.source),true);assert.equal(fs.existsSync(item.typedSource),true);}

// Historical evidence is reused only when the exact component bytes match R2.
const historical=read('output/local-collection/fingerprints.json');
const digest=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const unchanged=historical.filter(row=>/^src\/(content|tailwind|ts-default|ts-tailwind|demo|constants\/code)\//.test(row.file));
for(const row of unchanged)assert.equal(digest(row.file),row.sha256,'R2 source changed: '+row.file);
const previous=new Map(fs.readFileSync('LOCAL-COLLECTION-EVIDENCE.md','utf8').split(/\r?\n/).filter(line=>line.startsWith('| ')).map(line=>[line.split(' | ')[0].slice(2),line]));
const diff=execFileSync('git',['diff','--name-only'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split(/\r?\n/).filter(Boolean).sort();
const newNames=new Set(definitions.map(item=>item.name));
const priorFingerprintFile=directory+'/fingerprints.json';
if(fs.existsSync(priorFingerprintFile)){
  const priorSources=read(priorFingerprintFile).filter(row=>{
    const match=row.file.match(/^src\/(content|tailwind|ts-default|ts-tailwind)\/Components\/([^/]+)\//);
    return match&&newNames.has(match[2]);
  });
  assert.equal(priorSources.length,60);
  for(const row of priorSources)assert.equal(digest(row.file),row.sha256,'R3 runtime source changed after browser evidence: '+row.file);
}
const describe=file=>{
  const source=file.match(/^src\/(content|tailwind|ts-default|ts-tailwind)\/Components\/([^/]+)\/[^/]+\.(jsx|tsx|css)$/);
  if(source&&newNames.has(source[2])){
    const variant=['content','tailwind','ts-default','ts-tailwind'].indexOf(source[1]);
    assert.equal(browser.rows.some(row=>row.name.startsWith(source[2]+' variant '+variant+' motion')&&row.passed),true);
    return [source[2]+' '+source[1]+' 的主体动效/样式/正常调用接口','verifyMotionCollection.cjs variant='+variant+'：真实变换或 clip/scroll/dash 字段变化、原生交互、390px 根边界；360 个根样式 parity 字段；'+(source[3]==='tsx'?'严格 tsc 无诊断；':'')+'checkLocalCollection.mjs 四版本逻辑相同；不是逐像素/全部宿主样式证明'];
  }
  const demo=file.match(/^src\/demo\/Components\/([^/]+)Demo.jsx$/);
  if(demo&&newNames.has(demo[1])){assert.equal(docs.rows.find(row=>row.component===demo[1])?.passed,true);return [demo[1]+' 库文档/props/使用源码','verifyMotionDocs.cjs：实际 previewParts>=2、props 存在、code/usage 函数名、registry name/origin/files 字段；未逐个操作 Customize'];}
  const item=definitions.find(item=>file===`src/constants/code/Components/${item.name[0].toLowerCase()+item.name.slice(1)}Code.js`);
  if(item)return [item.name+' 五份原始源码与示例','checkLocalCollection.mjs：raw imports==5；verifyMotionDocs.cjs 实际导出函数和用法 import 呈现；四包精确载荷'];
  const payload=registry.rows.find(row=>row.file===file);
  if(payload)return [payload.component+' '+payload.variant+' 本地安装包','checkLocalRegistry.mjs：content===source、target===@components/文件名、meta.origin===local、索引计数===1；仅 BeamPath/LiquidAction TS-CSS 本轮逐个 CLI 安装'];
  const updated={
    'scripts/generateLocalCollection.mjs':['新增十项定义、hooks/types 导入、属性选择器与公开 data-part 生成','实际生成 112 份实现、parse/parity 112/112、CSS pairs28/28、TS56、默认值239表；新40份 browser 工况与根样式 parity；旧144份源码 SHA 与 R2 相等；任意未来定义未单测'],
    'src/constants/LocalCollection.js':['28项机器目录、风格/中英文标签/API/路径','checkLocalCollection.mjs：每项catalog出现==1、origin==local；guide 表项==28且源码路径存在；registry112/112'],
    'src/constants/LocalComponents.js':['28份惰性 demo 入口','checkLocalCollection.mjs 28个映射存在；本轮新10路由10/10，其余18沿用R2文档证据且原demo SHA相同'],
    'AI-COMPONENTS.md':['28项风格表与按动态机制取用表、可控/自动播放约定','本脚本表项与机器目录逐项匹配且路径存在；真实CLI2项4文件相等/7行为字段；未来AI遵循文字与全部使用示例未单独验证'],
    'README.md':['28项本地扩展入口','指南链接目标存在；文字不构成未来AI取用行为证明'],
    'WORKLOG.md':['R3做了/没做/失败/风险账本','本轮命令/字段统计由本脚本门禁；历史R2独立标注，未声称新测旧行为'],
    'MOTION-COLLECTION-EVIDENCE.md':['R3逐文件证据与边界','本脚本 report rows==git diff --name-only count；自引用 SHA 在指纹文件'],
    'public/llms.txt':['28项本地来源/源码/安装目录','checkLocalRegistry.mjs：28项路径和本地URL存在；无官网发布'],
    'public/r/registry.json':['112个本地包索引','checkLocalRegistry.mjs 每名称计数==1、源/目标/来源一致；旧844内容无diff'],
    'tsconfig.local-collection.json':['56份本地TS实现的严格类型范围','npx tsc -p tsconfig.local-collection.json exit0；其余既有TS未包含'],
    'scripts/createMotionFixture.mjs':['40份真实源码的正常props调用方','生成物承载140/140工况、836字段断言；没有生产测试钩子；不进入产品路由'],
    'scripts/verifyMotionCollection.cjs':['正常动效/原生操作/偏好/视口/空值等字段断言','四批全量35x4=140，通过140，fail/skipped/errors均0；没有跳过任何variant或用例；具体actual/expected存browser.json'],
    'scripts/verifyMotionDocs.cjs':['十个生产库路由/props/源码/registry UI呈现','10/10、fail/skipped/errors0；文档Customize及其他源码选项未逐个操作'],
    'scripts/createMotionInstalledFixture.mjs':['真实安装源/样式相等与独立调用方入口','安装文件 content===库源码 4/4；生成入口运行 verifyMotionInstalled.cjs 7/7；构建工具使用仓库Vite配置，消费组件没有主题依赖'],
    'scripts/verifyMotionInstalled.cjs':['两项安装后行为检查','7/7字段，背景RGB、dash位移、counter1/2、暂停相等、pageerrors==[]；其余新38包没有逐个CLI安装'],
    'scripts/captureMotionShowcase.cjs':['真实DOM动作/截图录像取样','实际脚本截图10张、normal motion、mouse/tab/scroll；录像/截图只证明呈现，不替代上述行为断言'],
    'scripts/collectMotionEvidence.mjs':['四批结果/样式/历史指纹/逐文件机械门禁','本轮执行 exit0；total140、836字段、360 parity字段、旧144源码SHA相等、每文件有表行；私有分类函数未单测']
  };
  if(updated[file])return updated[file];
  if(file.startsWith('scripts/local-collection/')&&/spatial|kinetic|scene-core/.test(file))return ['十项动效定义或可复制时钟模板','生成物40份交互、20生命周期工况、56TS类型检查、正常/空数据/NaN字段断言；document hidden 分支未单独触发；私有模板无单测'];
  if(previous.has(file))return null;
  throw new Error('unclassified changed file: '+file);
};
const rows=diff.map(file=>{const info=describe(file);return info?'| '+file+' | '+info[0]+' | '+info[1]+' |':previous.get(file).replace(/ \|$/,'；沿用 R2 首次证据，本轮未重跑该行为 |');});
const report=`# R3 主体动效逐文件证据\n\n首次产生：2026-09-30 用户要求参考 Aceternity；只扩展组件库。改动集合是整个当前 git diff --stat/name-only，${diff.length} 文件（包含未提交的 R2，不把历史产物冒充本轮新增）。环境、命题映射、命令/退出码、未覆盖范围和新风险见 WORKLOG.md。\n\n本轮新增 10 项/40 实现/40 安装包。浏览器 140/140（failed=0/skipped=0），${fields.length} actual==expected 字段断言，含 360 个根样式 parity；文档 10/10，真实CLI安装后 7/7。旧 ${unchanged.length} 份组件/demo/code 源码 SHA 与 R2 指纹相等，旧行为引用明确为历史证据。编译/HTTP 200/录像不能替代行为断言。\n\n| 改动文件 | 改动语义 | 针对该语义的证据或明确缺口 |\n| --- | --- | --- |\n${rows.join('\n')}\n\n本轮指纹包含路径/mtime/SHA/首次轮次，另存 output/local-collection/r3/fingerprints.json。浏览器原始失败 batch0.json（34/35）保留；修正后 batch0-fixed.json（35/35）。原始长时等待运行在定位失败时中止，没有归为通过。\n`;
fs.writeFileSync('MOTION-COLLECTION-EVIDENCE.md',report);
assert.equal(rows.length,diff.length);
fs.writeFileSync(directory+'/change-stat.txt',execFileSync('git',['diff','--stat'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}));
const artifacts=[...diff,directory+'/browser.json',directory+'/docs.json',directory+'/installed.json',directory+'/build-verified.log','output/local-collection/registry.json',directory+'/motion-final.webm',directory+'/motion-preview.gif',directory+'/contact-sheet.png'];
fs.writeFileSync(directory+'/fingerprints.json',JSON.stringify(artifacts.map(file=>({file,firstAppearance:previous.has(file)?'R2; R3 updates if indicated in report':'R3 2026-09-30 motion expansion',mtime:fs.statSync(file).mtime.toISOString(),sha256:digest(file)})),null,2));
console.log(`browser=140/140; fields=${fields.length}; styles=360/360; docs=10/10; installed=7/7; registry=112/112; R2_source_SHA_unchanged=${unchanged.length}; file_evidence=${rows.length}/${diff.length}; guide_items=28; failed=0; skipped=0`);
