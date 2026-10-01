import fs from 'node:fs';
import { localCollection } from '../src/constants/LocalCollection.js';

// Development-only caller, never imported by the component library or production demos.
const out = 'output/local-collection';
fs.mkdirSync(out, { recursive: true });
const variants = ['content', 'tailwind', 'ts-default', 'ts-tailwind'];
const imports = localCollection.flatMap(({ name, category }) => variants.map((variant, index) =>
  `import ${name}${index} from '/src/${variant}/${category}/${name}/${name}.${index > 1 ? 'tsx' : 'jsx'}';`
)).join('\n');
const map = localCollection.map(({ name }) => `${name}: [${variants.map((_, index) => name + index).join(',')}]`).join(',\n');
const source = `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './fixture.css';
${imports}
const components = {${map}};
const tabs = [{id:'design',label:'Design',content:'Design panel'}, {id:'motion',label:'Motion',content:'Motion panel'}, {id:'code',label:'Code',content:'Code panel'}];
const accordion = [{id:'first',title:'First chapter',content:'First detail'}, {id:'second',title:'Second chapter',content:'Second detail'}];
const commands = [{id:'new',label:'New project',shortcut:'N'}, {id:'archive',label:'Archives',shortcut:'A'}, {id:'settings',label:'Settings',shortcut:'S'}];
const links = [{label:'Studio',href:'#studio'}, {label:'Works',href:'#works'}, {label:'About',href:'#about'}];
function Caller({name,variant,controlled}) {
  const Component = components[name][variant];
  const initial = {ElasticTabs:'design',OrbitSlider:60,BauhausStepper:0,NeonToggle:false,BubbleChoice:'Peach',PaperNote:'Make something worth keeping.',PixelMeter:8,SpringAccordion:null,PostcardFlip:false,VinylDeck:false,OrigamiNav:false};
  const [model,setModel] = useState(initial[name]);
  const [callback,setCallback] = useState(null);
  const [count,setCount] = useState(0);
  const [disabled,setDisabled] = useState(false);
  const [status,setStatus] = useState('idle');
  const [empty,setEmpty] = useState(false);
  const [toasts,setToasts] = useState([{id:'a',title:'Saved',message:'Draft stored.'},{id:'b',title:'Shared',message:'Ready for review.'}]);
  const change = value => {setModel(value);setCallback(value);setCount(n=>n+1);};
  const props = {};
  if (initial[name] !== undefined) {props.onChange=change;if(controlled)props.value=model;}
  if (name==='ElasticTabs') props.items=tabs;
  if (name==='SpringAccordion') {props.items=accordion;props.onChange=change;}
  if (name==='ToastStack') {props.items=toasts;props.onDismiss=id=>{setToasts(old=>old.filter(item=>item.id!==id));change(id);};}
  if (['RippleButton','ArcadeButton'].includes(name)) {props.onClick=()=>change('activated');props.disabled=disabled;}
  if (name==='NeonToggle') {props.disabled=disabled;if(controlled)props.checked=model;delete props.value;}
  for(const [component,prop] of [['PostcardFlip','flipped'],['VinylDeck','spinning'],['OrigamiNav','open']]) if(name===component) {if(controlled)props[prop]=model;delete props.value;}
  if (name==='MonoCommand') {props.items=commands;props.onSelect=item=>change(item.id);}
  if (name==='OrigamiNav') {props.items=links;props.onChange=change;}
  if (name==='TerminalStatus') props.status=status;
  if (['PostcardFlip','VinylDeck','RibbonBadge','BlueprintPanel'].includes(name)) props.onChange=change;
  if(empty) {
    if(['ElasticTabs','SpringAccordion','ToastStack','MonoCommand','OrigamiNav'].includes(name))props.items=[];
    if(name==='BauhausStepper')props.steps=[];
    if(name==='BubbleChoice')props.options=[];
  }
  return <>
    <section id="specimen" data-name={name} data-variant={variant}><Component {...props}/></section>
    <aside><output id="callback">{JSON.stringify(callback)}</output><output id="calls">{count}</output>
      <label><input id="disabled" type="checkbox" checked={disabled} onChange={e=>setDisabled(e.target.checked)}/>Disable</label>
      <label>Status<select id="status" value={status} onChange={e=>setStatus(e.target.value)}>{['idle','running','success','error'].map(value=><option key={value}>{value}</option>)}</select></label>
      <button id="restore" onClick={()=>setToasts([{id:'c',title:'Restored',message:'Another notification.'}])}>Restore toast</button>
      <button id="reset-model" onClick={()=>setModel(initial[name])}>Reset controlled model</button>
      <label><input id="empty" type="checkbox" checked={empty} onChange={e=>setEmpty(e.target.checked)}/>Empty data</label>
    </aside>
  </>;
}
function App() {
  const [name,setName] = useState(Object.keys(components)[0]);
  const [variant,setVariant] = useState(0);
  const [controlled,setControlled] = useState(false);
  return <main><header><label>Component<select id="component" value={name} onChange={e=>setName(e.target.value)}>{Object.keys(components).map(name=><option key={name}>{name}</option>)}</select></label>
    <label>Variant<select id="variant" value={variant} onChange={e=>setVariant(Number(e.target.value))}>{['JS-CSS','JS-TW','TS-CSS','TS-TW'].map((label,i)=><option value={i} key={label}>{label}</option>)}</select></label>
    <label><input id="controlled" type="checkbox" checked={controlled} onChange={e=>setControlled(e.target.checked)}/>Controlled</label></header>
    <Caller key={name+variant+controlled} name={name} variant={variant} controlled={controlled}/></main>;
}
createRoot(document.getElementById('root')).render(<App/>);
`;
fs.writeFileSync(out + '/fixture.jsx', source);
fs.writeFileSync(out + '/fixture.css', `@import 'tailwindcss';
@layer base {*{box-sizing:border-box}body{margin:0;background:#e9e6e0;color:#292929;font:14px system-ui}main{padding:20px}header,aside{display:flex;gap:18px;align-items:center;flex-wrap:wrap}header{margin-bottom:32px}header label,aside label{display:flex;gap:8px;align-items:center}select{border:1px solid #aaa;padding:6px;background:white}#specimen{min-height:440px;display:flex;align-items:center;justify-content:center;padding:20px}aside{margin-top:24px}aside output{padding:8px;background:white}#specimen>div,#specimen>button{flex-shrink:1}}
`);
fs.writeFileSync(out + '/index.html', '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local collection verification caller</title></head><body><div id="root"></div><script type="module" src="./fixture.jsx"></script></body></html>');
console.log(`fixture_components=${localCollection.length}; fixture_implementations=${localCollection.length * 4}`);
