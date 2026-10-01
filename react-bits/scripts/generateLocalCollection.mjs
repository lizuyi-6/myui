import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import prettier from 'prettier';
import { essential } from './local-collection/essential.mjs';
import { playful } from './local-collection/playful.mjs';
import { expressive } from './local-collection/expressive.mjs';
import { spatial } from './local-collection/spatial.mjs';
import { kinetic } from './local-collection/kinetic.mjs';
import { liveMotion } from './local-collection/core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const definitions = [...essential, ...playful, ...expressive, ...spatial, ...kinetic];
const variants = ['content', 'tailwind', 'ts-default', 'ts-tailwind'];
const slug = name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const title = name => name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const lower = name => name[0].toLowerCase() + name.slice(1);
const write = async (relative, contents, parser) => {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, parser ? await prettier.format(contents, { parser, singleQuote: true, printWidth: 120, trailingComma: 'none' }) : contents);
};
const arbitrary = declaration => declaration.split(';').filter(Boolean).map(rule => `[${rule.trim().replace(/\s+/g, '_')}]`).join(' ');
const normalizeCss = declarations => {
  const properties = new Map();
  for (const declaration of declarations.split(';').filter(Boolean)) {
    const colon = declaration.indexOf(':');
    const key = declaration.slice(0, colon).trim();
    const value = declaration.slice(colon + 1).trim();
    // Expand overlapping shorthands before emitting utilities. Tailwind orders
    // utilities independently of their order in a className string.
    if (key === 'font' && value === 'inherit') {
      for (const field of ['family', 'size', 'weight', 'style', 'variant', 'stretch']) properties.set('font-' + field, 'inherit');
      properties.set('line-height', 'inherit');
    } else if (/^border(?:-(?:top|right|bottom|left))?$/.test(key)) {
      const parts = value === 'none' ? ['0', 'none', 'currentColor'] : value.split(/\s+/);
      const sides = key === 'border' ? ['top', 'right', 'bottom', 'left'] : [key.slice(7)];
      for (const side of sides) {
        properties.set('border-' + side + '-width', parts[0]);
        properties.set('border-' + side + '-style', parts[1]);
        properties.set('border-' + side + '-color', parts.slice(2).join(' '));
      }
    } else properties.set(key, value);
  }
  return [...properties].map(([property, value]) => property + ':' + value + ';').join('');
};
const importNames = (source, candidates) => candidates.filter(name => new RegExp(`\\b${name}\\b`).test(source));

for (const definition of definitions) {
  const { name, category } = definition;
  // Preserve the repo's standard scaffold workflow; registration is handled below
  // because the current scaffold script only creates files.
  if (!fs.existsSync(path.join(root, `src/content/${category}/${name}/${name}.jsx`))) {
    execFileSync(process.execPath, ['scripts/generateComponent.js', category, name], { cwd: root, stdio: 'pipe' });
  }
  const prefix = `lc-${slug(name)}`;
  const cssMap = Object.fromEntries(Object.entries({ ...definition.css, ...definition.extendCss }).map(([key, declarations]) => [key, normalizeCss(declarations)]));
  const classNames = Object.keys(cssMap).filter(key => /^[a-zA-Z]+$/.test(key));
  const classes = Object.fromEntries(classNames.map(key => [key, `${prefix}-${key}`]));
  const twClasses = Object.fromEntries(classNames.map(key => [key, arbitrary(cssMap[key]) + Object.entries(cssMap)
    .filter(([selector]) => selector.startsWith(key + ':'))
    .map(([selector, declarations]) => {
      const condition = selector.slice(key.length + 1);
      const variant = condition.startsWith('[') ? `[&${condition}]` : condition;
      return ' ' + arbitrary(declarations).split(' ').map(token => variant + ':' + token).join(' ');
    }).join('')]));
  const stylesheet = Object.entries(cssMap).filter(([, declarations]) => declarations).map(([key, declarations]) => `.${prefix}-${key.replace(':[' ,'[')}{${declarations}}`).join('\n');
  const propsType = `export interface ${name}Props {\n${definition.props.map(prop => `${prop.name}${prop.name === 'items' ? '' : '?'}: ${prop.type};`).join('\n')}\n}`;
  const parameters = definition.props.map(prop => prop.name + (prop.initial !== undefined ? ' = ' + prop.initial : '')).join(',\n');
  const bodyTemplate = `${definition.types ?? ''}\n${propsType}\n${liveMotion}\n${definition.helpers ?? ''}\nexport default function ${name}({${parameters}}: ${name}Props) {\n${definition.setup}\nreturn (${definition.render});\n}`;
  // Public styling parts stay stable across named-CSS and utility variants.
  const body = [...spatial, ...kinetic].some(item => item.name === name)
    ? bodyTemplate.replace(/className=\{c\.(\w+)\}/g, 'data-part="$1" className={c.$1}')
    : bodyTemplate;
  const hooks = importNames(body, ['useState', 'useRef', 'useId', 'useSyncExternalStore', 'useEffect', 'useMemo', 'useCallback']);
  const types = importNames(body, ['CSSProperties', 'ReactNode', 'KeyboardEvent', 'MouseEvent', 'PointerEvent', 'RefObject']);
  const motion = importNames(body, ['motion', 'AnimatePresence', 'useIsPresent', 'useInView', 'useMotionValue', 'useSpring', 'useTransform', 'useAnimationFrame', 'useScroll']);
  const motionTypes = importNames(body, ['MotionValue']);
  for (const variant of variants) {
    const tailwind = variant.endsWith('tailwind');
    const typed = variant.startsWith('ts-');
    let source = `'use client';\nimport { ${hooks.join(', ')} } from 'react';\nimport type { ${types.join(', ')} } from 'react';\nimport { ${motion.join(', ')} } from 'motion/react';\n${motionTypes.length ? `import type { ${motionTypes.join(', ')} } from 'motion/react';\n` : ''}${tailwind ? '' : `import './${name}.css';`}\nconst c = ${JSON.stringify(tailwind ? twClasses : classes)};\n${body}`;
    if (!typed) source = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
    await write(`src/${variant}/${category}/${name}/${name}.${typed ? 'tsx' : 'jsx'}`, source, typed ? 'typescript' : 'babel');
    if (!tailwind) await write(`src/${variant}/${category}/${name}/${name}.css`, stylesheet, 'css');
  }
  const scalar = definition.props.filter(prop => ['accent', 'surface', 'ink', 'disabled', definition.control?.prop].includes(prop.name) && prop.initial !== undefined);
  const defaults = '{' + scalar.map(prop => `${prop.name}: ${prop.initial}`).join(',') + '}';
  const propData = definition.props.map(prop => ({ name: prop.name, type: prop.type, default: prop.initial ?? 'undefined', description: prop.description }));
  const stateImports = definition.demoSetup ? ', useState' : '';
  const extraControl = definition.control ? `<PreviewSelect title="${definition.control.prop}" options={${JSON.stringify(definition.control.options)}} value={props.${definition.control.prop}} onChange={value => updateProp('${definition.control.prop}', value)} />` : '';
  const disabledControl = scalar.some(prop => prop.name === 'disabled') ? `<PreviewSwitch title="Disabled" isChecked={props.disabled} onChange={value => updateProp('disabled', value)} />` : '';
  const previewComponent = `<${name} key={key} ${definition.example} {...props} ${definition.demoChildren ? `>${definition.demoChildren}</${name}>` : '/>'}`;
  const demo = `import { useMemo${stateImports} } from 'react';
    import { Box } from '@chakra-ui/react';
    import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
    import Customize from '../../components/common/Preview/Customize';
    import PreviewSelect from '../../components/common/Preview/PreviewSelect';
    ${disabledControl ? "import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';" : ''}
    import RefreshButton from '../../components/common/Preview/RefreshButton';
    import PropTable from '../../components/common/Preview/PropTable';
    import Dependencies from '../../components/code/Dependencies';
    import CodeExample from '../../components/code/CodeExample';
    import useForceRerender from '../../hooks/useForceRerender';
    import useComponentProps from '../../hooks/useComponentProps';
    import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
    import ${name} from '../../content/${category}/${name}/${name}';
    import { ${lower(name)} } from '../../constants/code/${category}/${lower(name)}Code';
    const DEFAULT_PROPS = ${defaults};
    export default function ${name}Demo() {
      const [key, forceRerender] = useForceRerender();
      const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
      ${definition.demoSetup ?? ''}
      const propData = useMemo(() => ${JSON.stringify(propData)}, []);
      return <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
        <TabsLayout><PreviewTab>
          <Box data-local-component="${name}" className="demo-container" minH="420px" display="flex" alignItems="center" justifyContent="center" position="relative" padding="32px" overflow="visible">
            ${previewComponent}
            <RefreshButton onClick={forceRerender} />
          </Box>
          <Customize><PreviewSelect title="Accent" value={props.accent} options={[{label:'Original',value:DEFAULT_PROPS.accent},{label:'Coral',value:'#ef7848'},{label:'Mint',value:'#098a73'},{label:'Violet',value:'#8469ad'}]} onChange={value => updateProp('accent', value)} />${extraControl}${disabledControl}</Customize>
          <PropTable data={propData} /><Dependencies dependencyList={['motion']} />
        </PreviewTab><CodeTab><CodeExample codeObject={${lower(name)}} componentName="${name}" /></CodeTab></TabsLayout>
      </ComponentPropsProvider>;
    }`;
  await write(`src/demo/${category}/${name}Demo.jsx`, demo, 'babel');
  const usage = `import ${name} from './${name}';\n${definition.demoSetup ? "import { useState } from 'react';\n" : ''}\nexport default function Example() {\n${definition.demoSetup ?? ''}\nreturn (${definition.usage});\n}`;
  const code = `import code from '@content/${category}/${name}/${name}.jsx?raw';
    import css from '@content/${category}/${name}/${name}.css?raw';
    import tailwind from '@tailwind/${category}/${name}/${name}.jsx?raw';
    import tsCode from '@ts-default/${category}/${name}/${name}.tsx?raw';
    import tsTailwind from '@ts-tailwind/${category}/${name}/${name}.tsx?raw';
    export const ${lower(name)} = { dependencies: 'motion', usage: ${JSON.stringify(usage)}, code, css, tailwind, tsCode, tsTailwind };`;
  await write(`src/constants/code/${category}/${lower(name)}Code.js`, code, 'babel');
}

const collection = definitions.map(item => ({ name: item.name, title: title(item.name), category: item.category, slug: slug(item.name), style: item.style, description: item.description, tags: item.tags, dependencies: ['react', 'motion'], variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'], source: `src/content/${item.category}/${item.name}/${item.name}.jsx`, typedSource: `src/ts-default/${item.category}/${item.name}/${item.name}.tsx`, usage: item.usage, props: item.props.map(({ name, type, initial, description }) => ({ name, type, default: initial ?? 'undefined', description })) }));
await write('src/constants/LocalCollection.js', `/** Local additions, not published to reactbits.dev. */\nexport const localCollection = ${JSON.stringify(collection)};\nexport const localCollectionMetadata = Object.fromEntries(localCollection.map(item => [item.category + '/' + item.name, { name: item.name, category: item.category, description: item.description, tags: item.tags, added: '2026-09-30', videoUrl: '', docsUrl: 'http://localhost:5290/' + item.category.toLowerCase() + '/' + item.slug, meta: { origin: 'local', style: item.style } }]));`, 'babel');
await write('src/constants/LocalComponents.js', `export const localComponentMap = {\n${definitions.map(item => `${JSON.stringify(slug(item.name))}: () => import('../demo/${item.category}/${item.name}Demo.jsx')`).join(',\n')}\n};`, 'babel');

const informationPath = path.join(root, 'src/constants/Information.js');
let information = fs.readFileSync(informationPath, 'utf8');
if (!information.includes("from './LocalCollection.js'")) information = `import { localCollectionMetadata } from './LocalCollection.js';\n` + information.replace('export const componentMetadata = {', 'export const componentMetadata = {\n  ...localCollectionMetadata,');
fs.writeFileSync(informationPath, information);
const componentsPath = path.join(root, 'src/constants/Components.js');
let components = fs.readFileSync(componentsPath, 'utf8');
if (!components.includes("from './LocalComponents.js'")) components = `import { localComponentMap } from './LocalComponents.js';\n` + components.replace('export const componentMap = {', 'export const componentMap = {\n  ...localComponentMap,');
fs.writeFileSync(componentsPath, components);
const categoriesPath = path.join(root, 'src/constants/Categories.js');
let categories = fs.readFileSync(categoriesPath, 'utf8');
if (!categories.includes("import { localCollection }")) categories = `import { localCollection } from './LocalCollection.js';\n` + categories.replace('export const COMPONENT_COUNT', `// Local collection entries participate in the existing catalog and search.\nfor (const item of localCollection) {\n  const category = CATEGORIES.find(category => category.name === item.category);\n  if (category && !category.subcategories.includes(item.title)) category.subcategories.unshift(item.title);\n}\n\nexport const COMPONENT_COUNT`);
fs.writeFileSync(categoriesPath, categories);
console.log(`Generated ${definitions.length} standalone components, ${definitions.length * 4} implementations, ${definitions.length} demos and code recipes.`);
