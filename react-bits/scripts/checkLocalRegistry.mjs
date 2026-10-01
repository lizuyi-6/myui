import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { localCollection } from '../src/constants/LocalCollection.js';

const variants = [['JS-CSS','content','jsx'],['JS-TW','tailwind','jsx'],['TS-CSS','ts-default','tsx'],['TS-TW','ts-tailwind','tsx']];
const registry = JSON.parse(fs.readFileSync('public/r/registry.json','utf8'));
const llms = fs.readFileSync('public/llms.txt','utf8');
const rows = [];
for(const component of localCollection) {
  for(const [variant, directory, extension] of variants) {
    const name = component.name + '-' + variant;
    const filename = `public/r/${name}.json`;
    const item = JSON.parse(fs.readFileSync(filename,'utf8'));
    assert.equal(item.name,name);
    assert.equal(item.meta.origin,'local');
    assert.equal(item.dependencies.some(value=>value.startsWith('motion@')),true);
    assert.equal(registry.items.filter(value=>value.name===name).length,1);
    assert.equal(item.files.length,variant.endsWith('CSS')?2:1);
    for(const file of item.files) {
      assert.equal(file.target,`@components/${file.path}`,'source and stylesheet share a destination');
      const source = `src/${directory}/${component.category}/${component.name}/${file.path}`;
      assert.equal(file.content,fs.readFileSync(source,'utf8').replace(/\r\n/g,'\n'),'payload equals copied source');
    }
    assert.equal(item.files.some(file=>file.path===component.name+'.'+extension),true);
    rows.push({file:filename,component:component.name,variant,checks:['exact source payload','co-located import targets','dependency','local origin','index membership'],passed:true});
  }
  assert.equal(llms.includes(`src/content/${component.category}/${component.name}/`),true);
  assert.equal(llms.includes(`http://localhost:5290/r/${component.name}-JS-CSS.json`),true);
  const route=`/${component.category.toLowerCase()}/${component.slug}`;
  const html=fs.readFileSync(`dist${route}.html`,'utf8');
  assert.equal(html.includes(`rel="canonical" href="http://localhost:5290${route}"`),true,'local canonical');
  assert.equal(fs.readFileSync('dist/rss.xml','utf8').includes(`reactbits:${component.category}/${component.name}@added`),false,'unpublished additions excluded from official RSS');
}
// A registry build must not introduce platform formatting changes to old items.
const tracked = execFileSync('git',['ls-files','public/r/*.json'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(file=>file!=='public/r/registry.json');
const additions=new Set(rows.map(row=>row.file));
const originalFiles=tracked.filter(file=>!additions.has(file));
const changed=new Set(execFileSync('git',['diff','--name-only','--','public/r'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split(/\r?\n/));
assert.deepEqual(originalFiles.filter(file=>changed.has(file)),[],'no tracked original registry payload changed');
const originalItems=originalFiles.length;
const installed='output/local-collection/installed/@components';
for(const extension of ['tsx','css']) {
  const filename=`ArcadeButton.${extension}`;
  assert.equal(fs.readFileSync(path.join(installed,filename),'utf8').replace(/\r\n/g,'\n'),fs.readFileSync(`src/ts-default/Micro/ArcadeButton/${filename}`,'utf8').replace(/\r\n/g,'\n'),'real CLI installed source and style');
}
const evidence={total:rows.length,passed:rows.length,failed:0,skipped:0,originalItemsUnchanged:originalItems,realCliInstall:'ArcadeButton-TS-CSS, both source and CSS in @components, exact content',rows};
fs.writeFileSync('output/local-collection/registry.json',JSON.stringify(evidence,null,2));
console.log(`registry_variants=${rows.length}; exact_payloads=${rows.length}/${rows.length}; original_items_unchanged=${originalItems}; real_CLI_files=2/2; local_canonicals=${localCollection.length}/${localCollection.length}; upstream_RSS_local_items=0`);
