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
import BubbleChoice from '../../content/Micro/BubbleChoice/BubbleChoice';
import { bubbleChoice } from '../../constants/code/Micro/bubbleChoiceCode';
const DEFAULT_PROPS = { accent: '#c74f91', surface: '#fff0f7', ink: '#63334d' };
export default function BubbleChoiceDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'options',
        type: 'string[]',
        default: "['Peach', 'Mint', 'Lavender']",
        description: 'Radio labels and values.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected value.' },
      { name: 'defaultValue', type: 'string', default: "'Peach'", description: 'Initial selection.' },
      { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Selection callback.' },
      { name: 'label', type: 'string', default: "'Pick your mood'", description: 'Group legend.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#c74f91"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff0f7"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#63334d"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="BubbleChoice"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <BubbleChoice key={key} {...props} />
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
          <CodeExample codeObject={bubbleChoice} componentName="BubbleChoice" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
