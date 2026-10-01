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
import LiquidAction from '../../content/Components/LiquidAction/LiquidAction';
import { liquidAction } from '../../constants/code/Components/liquidActionCode';
const DEFAULT_PROPS = { disabled: false, accent: '#d283fb', surface: '#fff2f8', ink: '#49215b' };
export default function LiquidActionDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'label', type: 'string', default: "'Let’s make waves'", description: 'Accessible action label.' },
      {
        name: 'onClick',
        type: '()=>void',
        default: 'undefined',
        description: 'Caller owns activation; no external side effects are performed by this component.'
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable activation and magnetic response.' },
      {
        name: 'paused',
        type: 'boolean',
        default: 'false',
        description: 'Externally pause decorative motion; the built-in pause control also remains available.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Motion multiplier. Non-finite values fall back to 1; 0 freezes the scene.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#d283fb"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff2f8"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#49215b"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="LiquidAction"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <LiquidAction key={key} {...props} />
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
          <CodeExample codeObject={liquidAction} componentName="LiquidAction" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
