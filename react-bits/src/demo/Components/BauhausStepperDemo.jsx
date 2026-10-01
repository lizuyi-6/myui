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
import BauhausStepper from '../../content/Components/BauhausStepper/BauhausStepper';
import { bauhausStepper } from '../../constants/code/Components/bauhausStepperCode';
const DEFAULT_PROPS = { accent: '#cf392e', surface: '#f2ebdf', ink: '#242323' };
export default function BauhausStepperDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'steps',
        type: 'string[]',
        default: "['Discover', 'Make', 'Share']",
        description: 'Step labels in display order.'
      },
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled zero-based index.' },
      { name: 'defaultValue', type: 'number', default: '0', description: 'Initial index.' },
      {
        name: 'onChange',
        type: '(index: number) => void',
        default: 'undefined',
        description: 'Independent step selection callback.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#cf392e"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f2ebdf"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#242323"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="BauhausStepper"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <BauhausStepper key={key} {...props} />
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
          <CodeExample codeObject={bauhausStepper} componentName="BauhausStepper" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
