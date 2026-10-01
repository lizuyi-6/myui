import code from '@content/Components/KineticTiles/KineticTiles.jsx?raw';
import css from '@content/Components/KineticTiles/KineticTiles.css?raw';
import tailwind from '@tailwind/Components/KineticTiles/KineticTiles.jsx?raw';
import tsCode from '@ts-default/Components/KineticTiles/KineticTiles.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/KineticTiles/KineticTiles.tsx?raw';
export const kineticTiles = {
  dependencies: 'motion',
  usage:
    "import KineticTiles from './KineticTiles';\n\nexport default function Example() {\n\nreturn (<KineticTiles items={[{id:'design',label:'Design',symbol:'✦'},{id:'code',label:'Code',symbol:'◉'}]} onSelect={item=>console.log(item.id)}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
