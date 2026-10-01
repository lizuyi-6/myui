import fs from 'node:fs';
import assert from 'node:assert/strict';
const root='output/local-collection/installed';
for(const name of ['BeamPath','LiquidAction'])for(const extension of ['tsx','css']){
  assert.equal(fs.readFileSync(root+'/@components/'+name+'.'+extension,'utf8').replace(/\r\n/g,'\n'),fs.readFileSync('src/ts-default/Components/'+name+'/'+name+'.'+extension,'utf8').replace(/\r\n/g,'\n'));
}
fs.writeFileSync(root+'/motion-index.html','<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Installed motion components</title></head><body><div id="root"></div><script type="module" src="/motion-main.jsx"></script></body></html>');
fs.writeFileSync(root+'/motion-main.jsx',`import React,{useState} from 'react';import {createRoot} from 'react-dom/client';import BeamPath from './@components/BeamPath';import LiquidAction from './@components/LiquidAction';function App(){const [count,setCount]=useState(0);return <main style={{fontFamily:'system-ui',display:'flex',alignItems:'center',gap:30,padding:24}}><section id="beam"><BeamPath title="Installed circuit"/></section><section id="liquid"><LiquidAction label="Installed action" onClick={()=>setCount(value=>value+1)}/><output id="count">{count}</output></section></main>;}createRoot(document.getElementById('root')).render(<App/>);`);
console.log('real_CLI_source_CSS_matches=4/4; installed_components=2; theme=none');
