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
import PaperNote from '../../content/Micro/PaperNote/PaperNote';
import { paperNote } from '../../constants/code/Micro/paperNoteCode';
const DEFAULT_PROPS = { accent: '#cb6745', surface: '#fff0a5', ink: '#55452a' };
export default function PaperNoteDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled draft text.' },
      {
        name: 'defaultValue',
        type: 'string',
        default: "'Make something worth keeping.'",
        description: 'Initial draft text.'
      },
      {
        name: 'onChange',
        type: '(text: string) => void',
        default: 'undefined',
        description: 'Draft change callback, without persistence.'
      },
      { name: 'label', type: 'string', default: "'A small thought'", description: 'Accessible note label.' },
      { name: 'defaultPinned', type: 'boolean', default: 'false', description: 'Initial pin state.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#cb6745"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff0a5"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#55452a"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="PaperNote"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <PaperNote key={key} {...props} />
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
          <CodeExample codeObject={paperNote} componentName="PaperNote" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
