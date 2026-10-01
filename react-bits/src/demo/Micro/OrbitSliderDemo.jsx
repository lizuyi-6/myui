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
import OrbitSlider from '../../content/Micro/OrbitSlider/OrbitSlider';
import { orbitSlider } from '../../constants/code/Micro/orbitSliderCode';
const DEFAULT_PROPS = { accent: '#087f72', surface: '#e4f4ec', ink: '#133b31' };
export default function OrbitSliderDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value within min and max.' },
      { name: 'defaultValue', type: 'number', default: '60', description: 'Initial uncontrolled value.' },
      {
        name: 'onChange',
        type: '(value: number) => void',
        default: 'undefined',
        description: 'Input change callback.'
      },
      { name: 'min', type: 'number', default: '0', description: 'Minimum.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum; must exceed min.' },
      { name: 'step', type: 'number', default: '1', description: 'Positive native input increment.' },
      { name: 'label', type: 'string', default: "'Intensity'", description: 'Input and dial label.' },
      { name: 'unit', type: 'string', default: "'%'", description: 'Unit suffix.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#087f72"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#e4f4ec"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#133b31"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="OrbitSlider"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <OrbitSlider key={key} {...props} />
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
          <CodeExample codeObject={orbitSlider} componentName="OrbitSlider" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
