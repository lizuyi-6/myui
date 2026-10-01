import code from '@content/Components/BeamPath/BeamPath.jsx?raw';
import css from '@content/Components/BeamPath/BeamPath.css?raw';
import tailwind from '@tailwind/Components/BeamPath/BeamPath.jsx?raw';
import tsCode from '@ts-default/Components/BeamPath/BeamPath.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BeamPath/BeamPath.tsx?raw';
export const beamPath = {
  dependencies: 'motion',
  usage:
    "import BeamPath from './BeamPath';\n\nexport default function Example() {\n\nreturn (<BeamPath title=\"Your system\" labels={['Input','Plan','Draft','Review','Export','Share']} speed={1.2}><p>Your actual workflow content.</p></BeamPath>);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
