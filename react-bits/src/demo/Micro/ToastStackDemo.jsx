import { useMemo, useState } from 'react';
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
import ToastStack from '../../content/Micro/ToastStack/ToastStack';
import { toastStack } from '../../constants/code/Micro/toastStackCode';
const DEFAULT_PROPS = { accent: '#098a73', surface: '#effaf5', ink: '#163d32' };
export default function ToastStackDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const [items, setItems] = useState([
    { id: 'one', title: 'A tiny win', message: 'Keep that good idea.' },
    { id: 'two', title: 'You have room to explore', message: 'Hover or focus to unfold.' }
  ]);
  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'ToastItemData[]',
        default: 'undefined',
        description: 'Caller-owned toasts, newest first. No implicit expiration or item cap.'
      },
      {
        name: 'onDismiss',
        type: '(id: string) => void',
        default: 'undefined',
        description: 'Caller removes the identified toast.'
      },
      { name: 'emptyText', type: 'string', default: "'All caught up.'", description: 'Text when the list is empty.' },
      { name: 'ariaLabel', type: 'string', default: "'Notifications'", description: 'Accessible stack name.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#098a73"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#effaf5"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#163d32"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ToastStack"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ToastStack
              key={key}
              items={items}
              onDismiss={(id) => setItems((previous) => previous.filter((item) => item.id !== id))}
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
          <CodeExample codeObject={toastStack} componentName="ToastStack" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
