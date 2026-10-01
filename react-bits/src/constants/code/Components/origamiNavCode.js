import code from '@content/Components/OrigamiNav/OrigamiNav.jsx?raw';
import css from '@content/Components/OrigamiNav/OrigamiNav.css?raw';
import tailwind from '@tailwind/Components/OrigamiNav/OrigamiNav.jsx?raw';
import tsCode from '@ts-default/Components/OrigamiNav/OrigamiNav.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/OrigamiNav/OrigamiNav.tsx?raw';
export const origamiNav = {
  dependencies: 'motion',
  usage:
    "import OrigamiNav from './OrigamiNav';\n\nexport default function Example() {\n\nreturn (<OrigamiNav items={[{ label: 'Work', href: '/work' }, { label: 'Contact', href: '/contact' }]} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
