import code from '@content/Components/MonoCommand/MonoCommand.jsx?raw';
import css from '@content/Components/MonoCommand/MonoCommand.css?raw';
import tailwind from '@tailwind/Components/MonoCommand/MonoCommand.jsx?raw';
import tsCode from '@ts-default/Components/MonoCommand/MonoCommand.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MonoCommand/MonoCommand.tsx?raw';
export const monoCommand = {
  dependencies: 'motion',
  usage:
    "import MonoCommand from './MonoCommand';\n\nexport default function Example() {\n\nreturn (<MonoCommand items={[{ id: 'new', label: 'New project', shortcut: '⌘ N' }]} onSelect={item => console.log(item.id)} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
