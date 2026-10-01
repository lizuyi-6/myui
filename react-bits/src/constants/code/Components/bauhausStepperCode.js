import code from '@content/Components/BauhausStepper/BauhausStepper.jsx?raw';
import css from '@content/Components/BauhausStepper/BauhausStepper.css?raw';
import tailwind from '@tailwind/Components/BauhausStepper/BauhausStepper.jsx?raw';
import tsCode from '@ts-default/Components/BauhausStepper/BauhausStepper.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BauhausStepper/BauhausStepper.tsx?raw';
export const bauhausStepper = {
  dependencies: 'motion',
  usage:
    "import BauhausStepper from './BauhausStepper';\n\nexport default function Example() {\n\nreturn (<BauhausStepper steps={['Explore', 'Build', 'Launch']} onChange={index => console.log(index)} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
