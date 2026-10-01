import code from '@content/Components/ScrollTheater/ScrollTheater.jsx?raw';
import css from '@content/Components/ScrollTheater/ScrollTheater.css?raw';
import tailwind from '@tailwind/Components/ScrollTheater/ScrollTheater.jsx?raw';
import tsCode from '@ts-default/Components/ScrollTheater/ScrollTheater.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ScrollTheater/ScrollTheater.tsx?raw';
export const scrollTheater = {
  dependencies: 'motion',
  usage:
    "import ScrollTheater from './ScrollTheater';\n\nexport default function Example() {\n\nreturn (<ScrollTheater items={[{id:'a',title:'First act',content:'Your opening.'},{id:'b',title:'Second act',content:'Your next scene.'}]} height={400}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
