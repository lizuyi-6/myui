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
import MonoCommand from '../../content/Components/MonoCommand/MonoCommand';
import { monoCommand } from '../../constants/code/Components/monoCommandCode';
const DEFAULT_PROPS = { accent: '#383838', surface: '#fafafa', ink: '#262626' };
export default function MonoCommandDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'CommandItem[]',
        default: 'undefined',
        description: 'Available commands with stable ids.'
      },
      {
        name: 'onSelect',
        type: '(item: CommandItem) => void',
        default: 'undefined',
        description: 'Caller handles command execution.'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Find a command…'",
        description: 'Search placeholder and accessible label.'
      },
      {
        name: 'emptyText',
        type: 'string',
        default: "'No commands found. Try another search.'",
        description: 'Recovery guidance for an empty result.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#383838"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fafafa"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#262626"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="MonoCommand"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <MonoCommand
              key={key}
              items={[
                { id: 'new', label: 'Create a project', shortcut: '⌘ N' },
                { id: 'theme', label: 'Change theme', shortcut: '⌘ T' },
                { id: 'archive', label: 'Browse archives', shortcut: '⌘ K' }
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
          <CodeExample codeObject={monoCommand} componentName="MonoCommand" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
