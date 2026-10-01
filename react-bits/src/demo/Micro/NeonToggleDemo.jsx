import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import CodeExample from '../../components/code/CodeExample';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import NeonToggle from '../../content/Micro/NeonToggle/NeonToggle';
import { neonToggle } from '../../constants/code/Micro/neonToggleCode';
const DEFAULT_PROPS = { disabled: false, accent: '#a6fa69', surface: '#17201c', ink: '#def6e5' };
export default function NeonToggleDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled switch state.' },
      { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state.' },
      {
        name: 'onChange',
        type: '(checked: boolean) => void',
        default: 'undefined',
        description: 'Switch state callback.'
      },
      { name: 'label', type: 'string', default: "'SIGNAL'", description: 'Accessible switch name.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable switching.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#a6fa69"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#17201c"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#def6e5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="NeonToggle"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <NeonToggle key={key} {...props} />
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
            <PreviewSwitch
              title="Disabled"
              isChecked={props.disabled}
              onChange={(value) => updateProp('disabled', value)}
            />
          </Customize>
          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>
        <CodeTab>
          <CodeExample codeObject={neonToggle} componentName="NeonToggle" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
