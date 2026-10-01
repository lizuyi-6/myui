import code from '@content/Components/ShutterText/ShutterText.jsx?raw';
import css from '@content/Components/ShutterText/ShutterText.css?raw';
import tailwind from '@tailwind/Components/ShutterText/ShutterText.jsx?raw';
import tsCode from '@ts-default/Components/ShutterText/ShutterText.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ShutterText/ShutterText.tsx?raw';
export const shutterText = {
  dependencies: 'motion',
  usage:
    "import ShutterText from './ShutterText';\n\nexport default function Example() {\n\nreturn (<ShutterText words={['CREATE.','EXPLORE.','SHIP.']} interval={3} onChange={word=>console.log(word)}/>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
