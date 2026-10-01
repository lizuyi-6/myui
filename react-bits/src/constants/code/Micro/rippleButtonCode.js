import code from '@content/Micro/RippleButton/RippleButton.jsx?raw';
import css from '@content/Micro/RippleButton/RippleButton.css?raw';
import tailwind from '@tailwind/Micro/RippleButton/RippleButton.jsx?raw';
import tsCode from '@ts-default/Micro/RippleButton/RippleButton.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/RippleButton/RippleButton.tsx?raw';
export const rippleButton = {
  dependencies: 'motion',
  usage:
    "import RippleButton from './RippleButton';\n\nexport default function Example() {\n\nreturn (<RippleButton onClick={() => console.log('clicked')}>Explore now ↗</RippleButton>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
