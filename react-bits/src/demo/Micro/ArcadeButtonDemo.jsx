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
import ArcadeButton from '../../content/Micro/ArcadeButton/ArcadeButton';
import { arcadeButton } from '../../constants/code/Micro/arcadeButtonCode';
const DEFAULT_PROPS = { disabled: false, accent: '#ffb83e', surface: '#fbeac3', ink: '#312316' };
export default function ArcadeButtonDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'label', type: 'string', default: "'INSERT COIN'", description: 'Button caption.' },
      { name: 'onClick', type: '() => void', default: 'undefined', description: 'Activation callback.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable activation.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ffb83e"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fbeac3"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#312316"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ArcadeButton"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ArcadeButton key={key} {...props} />
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
          <CodeExample codeObject={arcadeButton} componentName="ArcadeButton" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
