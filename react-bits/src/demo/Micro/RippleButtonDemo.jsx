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
import RippleButton from '../../content/Micro/RippleButton/RippleButton';
import { rippleButton } from '../../constants/code/Micro/rippleButtonCode';
const DEFAULT_PROPS = { disabled: false, accent: '#ef7848', surface: '#fff0e6', ink: '#64331e' };
export default function RippleButtonDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'children', type: 'ReactNode', default: "'Make a ripple'", description: 'Button content.' },
      {
        name: 'onClick',
        type: '(event: MouseEvent<HTMLButtonElement>) => void',
        default: 'undefined',
        description: 'Activation callback.'
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevent activation.' },
      { name: 'ariaLabel', type: 'string', default: 'undefined', description: 'Accessible name override.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ef7848"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff0e6"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#64331e"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="RippleButton"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <RippleButton key={key} {...props} />
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
          <CodeExample codeObject={rippleButton} componentName="RippleButton" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
