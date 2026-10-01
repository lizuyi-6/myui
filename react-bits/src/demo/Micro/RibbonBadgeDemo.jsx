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
import RibbonBadge from '../../content/Micro/RibbonBadge/RibbonBadge';
import { ribbonBadge } from '../../constants/code/Micro/ribbonBadgeCode';
const DEFAULT_PROPS = { accent: '#ad473e', surface: '#fff3e7', ink: '#603b32' };
export default function RibbonBadgeDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'label', type: 'string', default: "'A LITTLE EXTRA'", description: 'Ribbon caption.' },
      {
        name: 'detail',
        type: 'ReactNode',
        default: "'Made with care. Kept with love.'",
        description: 'Revealed supporting content.'
      },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial disclosure state.' },
      { name: 'onChange', type: '(open: boolean) => void', default: 'undefined', description: 'Disclosure callback.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ad473e"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff3e7"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#603b32"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="RibbonBadge"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <RibbonBadge key={key} {...props} />
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
          <CodeExample codeObject={ribbonBadge} componentName="RibbonBadge" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
