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
import BlueprintPanel from '../../content/Components/BlueprintPanel/BlueprintPanel';
import { blueprintPanel } from '../../constants/code/Components/blueprintPanelCode';
const DEFAULT_PROPS = { accent: '#ffbe77', surface: '#0c355d', ink: '#d8e9f8' };
export default function BlueprintPanelDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'Object / 004'", description: 'Object title.' },
      {
        name: 'widthLabel',
        type: 'string',
        default: "'240 mm'",
        description: 'Caller-supplied horizontal dimension text.'
      },
      {
        name: 'heightLabel',
        type: 'string',
        default: "'160 mm'",
        description: 'Caller-supplied vertical dimension text.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Material: imagination. Finish: considered.'",
        description: 'Expanded specification content.'
      },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial specification visibility.' },
      { name: 'onChange', type: '(open: boolean) => void', default: 'undefined', description: 'Disclosure callback.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ffbe77"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#0c355d"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#d8e9f8"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="BlueprintPanel"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <BlueprintPanel key={key} {...props} />
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
          <CodeExample codeObject={blueprintPanel} componentName="BlueprintPanel" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
