import code from '@content/Components/BlueprintPanel/BlueprintPanel.jsx?raw';
import css from '@content/Components/BlueprintPanel/BlueprintPanel.css?raw';
import tailwind from '@tailwind/Components/BlueprintPanel/BlueprintPanel.jsx?raw';
import tsCode from '@ts-default/Components/BlueprintPanel/BlueprintPanel.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BlueprintPanel/BlueprintPanel.tsx?raw';
export const blueprintPanel = {
  dependencies: 'motion',
  usage:
    'import BlueprintPanel from \'./BlueprintPanel\';\n\nexport default function Example() {\n\nreturn (<BlueprintPanel title="Prototype / 001" widthLabel="120 mm" heightLabel="80 mm">Your actual specifications.</BlueprintPanel>);\n}',
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
