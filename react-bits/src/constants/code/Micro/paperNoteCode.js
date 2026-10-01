import code from '@content/Micro/PaperNote/PaperNote.jsx?raw';
import css from '@content/Micro/PaperNote/PaperNote.css?raw';
import tailwind from '@tailwind/Micro/PaperNote/PaperNote.jsx?raw';
import tsCode from '@ts-default/Micro/PaperNote/PaperNote.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/PaperNote/PaperNote.tsx?raw';
export const paperNote = {
  dependencies: 'motion',
  usage:
    'import PaperNote from \'./PaperNote\';\n\nexport default function Example() {\n\nreturn (<PaperNote defaultValue="Remember the little things." onChange={draft => console.log(draft)} />);\n}',
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
