import code from '@content/Micro/OrbitSlider/OrbitSlider.jsx?raw';
import css from '@content/Micro/OrbitSlider/OrbitSlider.css?raw';
import tailwind from '@tailwind/Micro/OrbitSlider/OrbitSlider.jsx?raw';
import tsCode from '@ts-default/Micro/OrbitSlider/OrbitSlider.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/OrbitSlider/OrbitSlider.tsx?raw';
export const orbitSlider = {
  dependencies: 'motion',
  usage:
    'import OrbitSlider from \'./OrbitSlider\';\n\nexport default function Example() {\n\nreturn (<OrbitSlider defaultValue={60} label="Volume" unit="%" onChange={value => console.log(value)} />);\n}',
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
