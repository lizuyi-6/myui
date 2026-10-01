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
import BeamPath from '../../content/Components/BeamPath/BeamPath';
import { beamPath } from '../../constants/code/Components/beamPathCode';
const DEFAULT_PROPS = { accent: '#54e7b0', surface: '#0d1917', ink: '#eefbf5' };
export default function BeamPathDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'All paths connect.'", description: 'Central heading.' },
      {
        name: 'labels',
        type: 'string[]',
        default: "['Ideas', 'Design', 'Motion', 'Build', 'Share', 'Ship']",
        description: 'Up to six circuit endpoint labels.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Bring your own workflow.'",
        description: 'Content below the central heading; this illustration performs no workflow.'
      },
      {
        name: 'paused',
        type: 'boolean',
        default: 'false',
        description: 'Externally pause decorative motion; the built-in pause control also remains available.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Motion multiplier. Non-finite values fall back to 1; 0 freezes the scene.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#54e7b0"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#0d1917"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#eefbf5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="BeamPath"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <BeamPath key={key} {...props} />
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
          <CodeExample codeObject={beamPath} componentName="BeamPath" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
