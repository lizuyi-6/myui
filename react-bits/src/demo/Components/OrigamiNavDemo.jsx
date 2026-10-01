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
import OrigamiNav from '../../content/Components/OrigamiNav/OrigamiNav';
import { origamiNav } from '../../constants/code/Components/origamiNavCode';
const DEFAULT_PROPS = { accent: '#8469ad', surface: '#f0e7fc', ink: '#453558' };
export default function OrigamiNavDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'OrigamiLink[]',
        default: 'undefined',
        description: 'Navigation labels and destinations.'
      },
      { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled expansion.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial expansion.' },
      { name: 'onChange', type: '(open: boolean) => void', default: 'undefined', description: 'Expansion callback.' },
      { name: 'label', type: 'string', default: "'Explore the studio'", description: 'Trigger label.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#8469ad"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f0e7fc"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#453558"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="OrigamiNav"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <OrigamiNav
              key={key}
              items={[
                { label: 'Selected work', href: '#selected-work' },
                { label: 'Our process', href: '#our-process' },
                { label: 'Say hello', href: '#say-hello' }
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
          <CodeExample codeObject={origamiNav} componentName="OrigamiNav" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
