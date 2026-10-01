import code from '@content/Components/OrbitStage/OrbitStage.jsx?raw';
import css from '@content/Components/OrbitStage/OrbitStage.css?raw';
import tailwind from '@tailwind/Components/OrbitStage/OrbitStage.jsx?raw';
import tsCode from '@ts-default/Components/OrbitStage/OrbitStage.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/OrbitStage/OrbitStage.tsx?raw';
export const orbitStage = {
  dependencies: 'motion',
  usage:
    "import OrbitStage from './OrbitStage';\n\nexport default function Example() {\n\nreturn (<OrbitStage items={[{id:'one',label:'Design',symbol:'✦',content:'Your first subject.'},{id:'two',label:'Build',symbol:'◉',content:'Your second subject.'}]} speed={1}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
