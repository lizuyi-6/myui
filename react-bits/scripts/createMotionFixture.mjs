import fs from 'node:fs';
import { spatial } from './local-collection/spatial.mjs';
import { kinetic } from './local-collection/kinetic.mjs';

const definitions = [...spatial, ...kinetic];
const variants = ['content', 'tailwind', 'ts-default', 'ts-tailwind'];
const imports = definitions.flatMap(({name,category})=>variants.map((variant,index)=>`import ${name}${index} from '/src/${variant}/${category}/${name}/${name}.${index>1?'tsx':'jsx'}';`)).join('\n');
const cases = definitions.map(item=>`case '${item.name}': return <Component {...common} ${item.example} {...overrides}${item.demoChildren?`>${item.demoChildren}</Component>`:'/>'};`).join('\n');
const source = `import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './motion.css';
${imports}
const components={${definitions.map(item=>`${item.name}:[${variants.map((_,index)=>item.name+index).join(',')}]`).join(',')}};
function Caller({name,variant}){
  const Component=components[name][variant];
  const [model,setModel]=useState(name==='PrismDeck'?'create':name==='OrbitStage'?'sun':false);
  const [controlled,setControlled]=useState(false);
  const [paused,setPaused]=useState(false);const [disabled,setDisabled]=useState(false);const [empty,setEmpty]=useState(false);const [count,setCount]=useState(0);const [last,setLast]=useState('');const [invalid,setInvalid]=useState(false);const [duplicate,setDuplicate]=useState(false);
  const change=value=>{setModel(value);setLast(typeof value==='object'?value.id:String(value));setCount(c=>c+1);};
  const common={paused,speed:invalid?NaN:1,disabled,onSelect:change,onChange:change,onClick:()=>change('activated')};
  const overrides={};
  if(controlled){if(name==='ApertureReveal')overrides.open=model;else overrides.value=model;}
  if(empty){if(['PrismDeck','OrbitStage','ScrollTheater','KineticTiles','ConveyorGallery'].includes(name))overrides.items=[];if(name==='ShutterText')overrides.words=[];if(name==='BeamPath')overrides.labels=[];}
  if(invalid){overrides.depth=NaN;overrides.strength=NaN;overrides.interval=NaN;overrides.height=NaN;}
  const specimen=()=>{switch(name){${cases}}};
  return <><section id="specimen" data-name={name}>{specimen()}</section>{duplicate&&<section id="duplicate-specimen">{specimen()}</section>}
    <aside><output id="calls">{count}</output><output id="last">{last}</output><label><input id="paused" type="checkbox" checked={paused} onChange={e=>setPaused(e.target.checked)}/>External pause</label><label><input id="disabled" type="checkbox" checked={disabled} onChange={e=>setDisabled(e.target.checked)}/>Disabled</label><label><input id="empty" type="checkbox" checked={empty} onChange={e=>setEmpty(e.target.checked)}/>Empty data</label><label><input id="controlled" type="checkbox" checked={controlled} onChange={e=>setControlled(e.target.checked)}/>Controlled</label><button id="reset" onClick={()=>setModel(name==='PrismDeck'?'create':name==='OrbitStage'?'sun':false)}>Reset model</button><label><input id="invalid" type="checkbox" checked={invalid} onChange={e=>setInvalid(e.target.checked)}/>Non-finite numeric props</label><label><input id="duplicate" type="checkbox" checked={duplicate} onChange={e=>setDuplicate(e.target.checked)}/>Two instances</label></aside><div id="spacer" style={{height:1500}}/><button id="bottom">Offscreen destination</button></>;
}
function App(){const [name,setName]=useState('DepthLiftCard');const [variant,setVariant]=useState(0);return <main><header><label>Component<select id="component" value={name} onChange={e=>setName(e.target.value)}>{Object.keys(components).map(n=><option key={n}>{n}</option>)}</select></label><label>Variant<select id="variant" value={variant} onChange={e=>setVariant(Number(e.target.value))}>{['JS-CSS','JS-TW','TS-CSS','TS-TW'].map((v,i)=><option value={i} key={v}>{v}</option>)}</select></label><span>Move · hover · scroll · select</span></header><Caller key={name+variant} name={name} variant={variant}/></main>}
createRoot(document.getElementById('root')).render(<App/>);
`;
fs.mkdirSync('output/local-collection/r3',{recursive:true});
fs.writeFileSync('output/local-collection/r3/motion.jsx',source);
fs.writeFileSync('output/local-collection/r3/motion.css',`@import 'tailwindcss';
@source '../../../src/tailwind/Components';
@source '../../../src/ts-tailwind/Components';
@layer base {*{box-sizing:border-box}body{margin:0;background:#e7e4dc;color:#222;font:14px system-ui}main{padding:20px}header,aside{display:flex;gap:14px;align-items:center;flex-wrap:wrap}header{margin-bottom:24px}header label,aside label{display:flex;align-items:center;gap:6px}select{background:white;padding:7px;border:1px solid #aaa}aside{margin-top:24px;padding:10px;background:#ffffff99;font-size:12px}#specimen{min-height:500px;display:flex;align-items:center;justify-content:center;padding:15px}aside button{padding:8px;border:1px solid #aaa}output{padding:8px;background:white}#bottom{padding:12px}}
`);
fs.writeFileSync('output/local-collection/r3/index.html','<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Motion library behavior fixture</title></head><body><div id="root"></div><script type="module" src="./motion.jsx"></script></body></html>');
console.log('motion_fixture_components=10; variants=40; normal_caller_props=true');
