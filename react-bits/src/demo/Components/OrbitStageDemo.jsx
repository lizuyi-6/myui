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
import OrbitStage from '../../content/Components/OrbitStage/OrbitStage';
import { orbitStage } from '../../constants/code/Components/orbitStageCode';
const DEFAULT_PROPS = { accent: '#ffb86b', surface: '#181411', ink: '#fff3e6' };
export default function OrbitStageDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'OrbitSubject[]',
        default: 'undefined',
        description: 'Subjects with stable ids; the first six orbit, all remain in the subject list.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected subject id.' },
      { name: 'defaultValue', type: 'string', default: "''", description: 'Initial selected id.' },
      { name: 'onChange', type: '(id:string)=>void', default: 'undefined', description: 'Subject selection callback.' },
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
        default: '"#ffb86b"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#181411"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#fff3e6"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="OrbitStage"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <OrbitStage
              key={key}
              items={[
                { id: 'sun', label: 'Sun', symbol: '☀', content: 'The heart of a moving system.' },
                { id: 'moon', label: 'Moon', symbol: '◔', content: 'A quieter point of view.' },
                { id: 'star', label: 'Star', symbol: '✦', content: 'Find your own constellation.' },
                { id: 'earth', label: 'Earth', symbol: '◉', content: 'Keep something worth orbiting.' }
              ]}
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
          <CodeExample codeObject={orbitStage} componentName="OrbitStage" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
