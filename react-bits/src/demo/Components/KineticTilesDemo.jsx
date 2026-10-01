import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import CodeExample from '../../components/code/CodeExample';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import KineticTiles from '../../content/Components/KineticTiles/KineticTiles';
import { kineticTiles } from '../../constants/code/Components/kineticTilesCode';
const DEFAULT_PROPS = { accent: '#edff7a', surface: '#f3f0e8', ink: '#151515' };
export default function KineticTilesDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'KineticItem[]',
        default: 'undefined',
        description: 'Grid items with stable ids and accessible labels.'
      },
      {
        name: 'onSelect',
        type: '(item:KineticItem)=>void',
        default: 'undefined',
        description: 'User activation callback.'
      },
      {
        name: 'strength',
        type: 'number',
        default: '28',
        description: 'Maximum lift in pixels; finite nonnegative values.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#edff7a"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f3f0e8"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#151515"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="KineticTiles"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <KineticTiles
              key={key}
              items={['Play', 'Build', 'Shape', 'Move', 'Think', 'Make', 'Share', 'Keep', 'Repeat'].map(
                (label, index) => ({
                  id: label,
                  label,
                  symbol: ['✦', '◉', '▰', '↗', '∞', '◒', '✳', '✚', '◎'][index],
                  color: ['#edff7a', '#ffb6c1', '#a7d8ff'][index % 3]
                })
              )}
              {...props}
            />
            <RefreshButton onClick={forceRerender} />
          </Box>
          <Customize>
            <PreviewSelect
              title="Accent"
              value={props.accent}
              options={[
                { label: 'Original', value: DEFAULT_PROPS.accent },
                { label: 'Coral', value: '#ef7848' },
                { label: 'Mint', value: '#098a73' },
                { label: 'Violet', value: '#8469ad' }
              ]}
              onChange={(value) => updateProp('accent', value)}
            />
          </Customize>
          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>
        <CodeTab>
          <CodeExample codeObject={kineticTiles} componentName="KineticTiles" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
