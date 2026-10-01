import code from '@content/Micro/ElasticTabs/ElasticTabs.jsx?raw';
import css from '@content/Micro/ElasticTabs/ElasticTabs.css?raw';
import tailwind from '@tailwind/Micro/ElasticTabs/ElasticTabs.jsx?raw';
import tsCode from '@ts-default/Micro/ElasticTabs/ElasticTabs.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/ElasticTabs/ElasticTabs.tsx?raw';
export const elasticTabs = {
  dependencies: 'motion',
  usage:
    "import ElasticTabs from './ElasticTabs';\n\nexport default function Example() {\n\nreturn (<ElasticTabs items={[{ id: 'design', label: 'Design', content: 'Your design panel' }, { id: 'code', label: 'Code', content: 'Your code panel' }]} onChange={id => console.log(id)} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
