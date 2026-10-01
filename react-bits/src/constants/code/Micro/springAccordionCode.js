import code from '@content/Micro/SpringAccordion/SpringAccordion.jsx?raw';
import css from '@content/Micro/SpringAccordion/SpringAccordion.css?raw';
import tailwind from '@tailwind/Micro/SpringAccordion/SpringAccordion.jsx?raw';
import tsCode from '@ts-default/Micro/SpringAccordion/SpringAccordion.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/SpringAccordion/SpringAccordion.tsx?raw';
export const springAccordion = {
  dependencies: 'motion',
  usage:
    "import SpringAccordion from './SpringAccordion';\n\nexport default function Example() {\n\nreturn (<SpringAccordion items={[{ id: 'faq', title: 'How does it work?', content: 'Your answer here.' }]} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
