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
import VinylDeck from '../../content/Components/VinylDeck/VinylDeck';
import { vinylDeck } from '../../constants/code/Components/vinylDeckCode';
const DEFAULT_PROPS = { accent: '#e67846', surface: '#e6dfd3', ink: '#302a24' };
export default function VinylDeckDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'Slow Sunday'", description: 'Record title.' },
      { name: 'artist', type: 'string', default: "'Side A / Studio Sessions'", description: 'Record subtitle.' },
      {
        name: 'spinning',
        type: 'boolean',
        default: 'undefined',
        description: 'Controlled visual rotation; does not play audio.'
      },
      { name: 'defaultSpinning', type: 'boolean', default: 'false', description: 'Initial visual rotation state.' },
      {
        name: 'onChange',
        type: '(spinning: boolean) => void',
        default: 'undefined',
        description: 'Visual rotation callback.'
      },
      { name: 'rpm', type: 'number', default: '33', description: 'Rotation speed; positive revolutions per minute.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#e67846"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#e6dfd3"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#302a24"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="VinylDeck"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <VinylDeck key={key} {...props} />
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
          <CodeExample codeObject={vinylDeck} componentName="VinylDeck" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
