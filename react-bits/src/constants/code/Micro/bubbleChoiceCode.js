import code from '@content/Micro/BubbleChoice/BubbleChoice.jsx?raw';
import css from '@content/Micro/BubbleChoice/BubbleChoice.css?raw';
import tailwind from '@tailwind/Micro/BubbleChoice/BubbleChoice.jsx?raw';
import tsCode from '@ts-default/Micro/BubbleChoice/BubbleChoice.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/BubbleChoice/BubbleChoice.tsx?raw';
export const bubbleChoice = {
  dependencies: 'motion',
  usage:
    "import BubbleChoice from './BubbleChoice';\n\nexport default function Example() {\n\nreturn (<BubbleChoice options={['Calm', 'Bright', 'Dreamy']} defaultValue=\"Calm\" onChange={mood => console.log(mood)} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
