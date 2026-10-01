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
import DepthLiftCard from '../../content/Components/DepthLiftCard/DepthLiftCard';
import { depthLiftCard } from '../../constants/code/Components/depthLiftCardCode';
const DEFAULT_PROPS = { accent: '#af9aff', surface: '#151223', ink: '#f5f1ff' };
export default function DepthLiftCardDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'A new dimension'", description: 'Card heading.' },
      { name: 'eyebrow', type: 'string', default: "'SPECIMEN / 001'", description: 'Small label.' },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Move closer. Every layer has its own depth.'",
        description: 'Foreground content, including caller-owned links or buttons.'
      },
      {
        name: 'depth',
        type: 'number',
        default: '60',
        description: 'Foreground lift in pixels; finite nonnegative values.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#af9aff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#151223"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#f5f1ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="DepthLiftCard"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <DepthLiftCard key={key} {...props} />
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
          <CodeExample codeObject={depthLiftCard} componentName="DepthLiftCard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
