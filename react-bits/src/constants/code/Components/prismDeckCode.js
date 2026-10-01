import code from '@content/Components/PrismDeck/PrismDeck.jsx?raw';
import css from '@content/Components/PrismDeck/PrismDeck.css?raw';
import tailwind from '@tailwind/Components/PrismDeck/PrismDeck.jsx?raw';
import tsCode from '@ts-default/Components/PrismDeck/PrismDeck.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/PrismDeck/PrismDeck.tsx?raw';
export const prismDeck = {
  dependencies: 'motion',
  usage:
    "import PrismDeck from './PrismDeck';\n\nexport default function Example() {\n\nreturn (<PrismDeck items={[{id:'design',label:'Design',title:'Build your idea.',content:<p>Your first panel.</p>},{id:'code',label:'Code',title:'Make it yours.',content:<p>Your second panel.</p>}]} onChange={id=>console.log(id)}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
