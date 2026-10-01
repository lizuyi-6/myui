import code from '@content/Micro/PixelMeter/PixelMeter.jsx?raw';
import css from '@content/Micro/PixelMeter/PixelMeter.css?raw';
import tailwind from '@tailwind/Micro/PixelMeter/PixelMeter.jsx?raw';
import tsCode from '@ts-default/Micro/PixelMeter/PixelMeter.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/PixelMeter/PixelMeter.tsx?raw';
export const pixelMeter = {
  dependencies: 'motion',
  usage:
    'import PixelMeter from \'./PixelMeter\';\n\nexport default function Example() {\n\nreturn (<PixelMeter label="LEVEL" max={16} defaultValue={8} onChange={level => console.log(level)} />);\n}',
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
