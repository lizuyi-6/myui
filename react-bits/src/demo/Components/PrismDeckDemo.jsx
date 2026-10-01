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
import PrismDeck from '../../content/Components/PrismDeck/PrismDeck';
import { prismDeck } from '../../constants/code/Components/prismDeckCode';
const DEFAULT_PROPS = { accent: '#b9a4ff', surface: '#171320', ink: '#fbf7ff' };
export default function PrismDeckDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'PrismPanel[]',
        default: 'undefined',
        description: 'Panels with stable unique ids and caller content.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected panel id.' },
      {
        name: 'defaultValue',
        type: 'string',
        default: "''",
        description: 'Initial selection; invalid ids display the first item.'
      },
      {
        name: 'onChange',
        type: '(id:string)=>void',
        default: 'undefined',
        description: 'Called for direct user selection.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#b9a4ff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#171320"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#fbf7ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="PrismDeck"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <PrismDeck
              key={key}
              items={[
                {
                  id: 'create',
                  label: 'Create',
                  title: 'Make it move.',
                  content: 'Layers slide into a new perspective.'
                },
                {
                  id: 'explore',
                  label: 'Explore',
                  title: 'Another angle.',
                  content: 'Every panel keeps its own content.',
                  color: '#34264f'
                },
                {
                  id: 'ship',
                  label: 'Ship',
                  title: 'Take it with you.',
                  content: 'Four source variants. Your own data.',
                  color: '#44355c'
                }
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
          <CodeExample codeObject={prismDeck} componentName="PrismDeck" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
