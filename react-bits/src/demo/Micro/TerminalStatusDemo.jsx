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
import TerminalStatus from '../../content/Micro/TerminalStatus/TerminalStatus';
import { terminalStatus } from '../../constants/code/Micro/terminalStatusCode';
const DEFAULT_PROPS = { status: 'idle', accent: '#80e0a2', surface: '#10241a', ink: '#b3e8c5' };
export default function TerminalStatusDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'status',
        type: "'idle' | 'running' | 'success' | 'error'",
        default: "'idle'",
        description: 'Display state supplied by the caller; not a health probe.'
      },
      { name: 'label', type: 'string', default: "'BUILD PIPELINE'", description: 'Display label.' },
      {
        name: 'detail',
        type: 'string',
        default: "'Awaiting your next move.'",
        description: 'Status detail supplied by the caller.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#80e0a2"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#10241a"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#b3e8c5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="TerminalStatus"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <TerminalStatus key={key} {...props} />
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
            <PreviewSelect
              title="status"
              options={['idle', 'running', 'success', 'error']}
              value={props.status}
              onChange={(value) => updateProp('status', value)}
            />
          </Customize>
          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>
        <CodeTab>
          <CodeExample codeObject={terminalStatus} componentName="TerminalStatus" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
