import fs from 'node:fs';
const root='output/local-collection/installed';
fs.writeFileSync(root+'/index.html','<!doctype html><html><head><meta charset="utf-8"><title>Installed component caller</title></head><body><div id="root"></div><script type="module" src="/main.jsx"></script></body></html>');
fs.writeFileSync(root+'/main.jsx',`import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import ArcadeButton from './@components/ArcadeButton';
function App(){const [count,setCount]=useState(0);return <div id="installed"><ArcadeButton label="INSTALLED COMPONENT" onClick={()=>setCount(n=>n+1)}/><output id="count">{count}</output></div>;}
createRoot(document.getElementById('root')).render(<App/>);
`);
console.log('installed_fixture=real_CLI_source_and_CSS; host_theme=none; Tailwind=none');
