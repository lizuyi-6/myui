import code from '@content/Micro/NeonToggle/NeonToggle.jsx?raw';
import css from '@content/Micro/NeonToggle/NeonToggle.css?raw';
import tailwind from '@tailwind/Micro/NeonToggle/NeonToggle.jsx?raw';
import tsCode from '@ts-default/Micro/NeonToggle/NeonToggle.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/NeonToggle/NeonToggle.tsx?raw';
export const neonToggle = {
  dependencies: 'motion',
  usage:
    'import NeonToggle from \'./NeonToggle\';\n\nexport default function Example() {\n\nreturn (<NeonToggle label="AMBIENT LIGHT" onChange={checked => console.log(checked)} />);\n}',
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
