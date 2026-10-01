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
import ScrollTheater from '../../content/Components/ScrollTheater/ScrollTheater';
import { scrollTheater } from '../../constants/code/Components/scrollTheaterCode';
const DEFAULT_PROPS = { accent: '#e84a32', surface: '#eee6cf', ink: '#191c20' };
export default function ScrollTheaterDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'TheaterScene[]',
        default: 'undefined',
        description: 'Scenes with stable ids; content follows the active scroll region.'
      },
      { name: 'height', type: 'number', default: '400', description: 'Viewport height in pixels, minimum 260.' },
      {
        name: 'onChange',
        type: '(id:string)=>void',
        default: 'undefined',
        description: 'Called when the active scene changes.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#e84a32"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#eee6cf"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#191c20"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ScrollTheater"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ScrollTheater
              key={key}
              items={[
                { id: 'form', title: 'FORM IN MOTION', content: 'Scroll to change the angle.' },
                { id: 'space', title: 'MAKE SOME SPACE', content: 'The foreground travels at another depth.' },
                { id: 'play', title: 'STAY PLAYFUL', content: 'Your content takes center stage.' }
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
          <CodeExample codeObject={scrollTheater} componentName="ScrollTheater" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
