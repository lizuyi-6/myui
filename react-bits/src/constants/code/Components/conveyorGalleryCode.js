import code from '@content/Components/ConveyorGallery/ConveyorGallery.jsx?raw';
import css from '@content/Components/ConveyorGallery/ConveyorGallery.css?raw';
import tailwind from '@tailwind/Components/ConveyorGallery/ConveyorGallery.jsx?raw';
import tsCode from '@ts-default/Components/ConveyorGallery/ConveyorGallery.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ConveyorGallery/ConveyorGallery.tsx?raw';
export const conveyorGallery = {
  dependencies: 'motion',
  usage:
    "import ConveyorGallery from './ConveyorGallery';\n\nexport default function Example() {\n\nreturn (<ConveyorGallery items={[{id:'one',title:'First frame',content:<span>✳</span>},{id:'two',title:'Second frame',content:<span>◒</span>}]} speed={1}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
