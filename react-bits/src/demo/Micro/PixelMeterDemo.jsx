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
import PixelMeter from '../../content/Micro/PixelMeter/PixelMeter';
import { pixelMeter } from '../../constants/code/Micro/pixelMeterCode';
const DEFAULT_PROPS = { accent: '#c29cff', surface: '#201c30', ink: '#f0e8ff' };
export default function PixelMeterDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value from 0 through max.' },
      { name: 'defaultValue', type: 'number', default: '8', description: 'Initial value.' },
      {
        name: 'onChange',
        type: '(value: number) => void',
        default: 'undefined',
        description: 'Native input change callback.'
      },
      { name: 'max', type: 'number', default: '16', description: 'Positive integer maximum.' },
      { name: 'label', type: 'string', default: "'ENERGY'", description: 'Accessible meter label.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#c29cff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#201c30"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#f0e8ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="PixelMeter"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <PixelMeter key={key} {...props} />
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
          <CodeExample codeObject={pixelMeter} componentName="PixelMeter" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
