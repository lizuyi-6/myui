import code from '@content/Components/LiquidAction/LiquidAction.jsx?raw';
import css from '@content/Components/LiquidAction/LiquidAction.css?raw';
import tailwind from '@tailwind/Components/LiquidAction/LiquidAction.jsx?raw';
import tsCode from '@ts-default/Components/LiquidAction/LiquidAction.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/LiquidAction/LiquidAction.tsx?raw';
export const liquidAction = {
  dependencies: 'motion',
  usage:
    "import LiquidAction from './LiquidAction';\n\nexport default function Example() {\n\nreturn (<LiquidAction label=\"Start creating\" onClick={()=>console.log('Caller action')} speed={1}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
