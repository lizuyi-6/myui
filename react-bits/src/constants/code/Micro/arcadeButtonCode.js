import code from '@content/Micro/ArcadeButton/ArcadeButton.jsx?raw';
import css from '@content/Micro/ArcadeButton/ArcadeButton.css?raw';
import tailwind from '@tailwind/Micro/ArcadeButton/ArcadeButton.jsx?raw';
import tsCode from '@ts-default/Micro/ArcadeButton/ArcadeButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/ArcadeButton/ArcadeButton.tsx?raw';
export const arcadeButton = {
  dependencies: 'motion',
  usage:
    "import ArcadeButton from './ArcadeButton';\n\nexport default function Example() {\n\nreturn (<ArcadeButton label=\"PLAY AGAIN\" onClick={() => console.log('start')} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
