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
import ConveyorGallery from '../../content/Components/ConveyorGallery/ConveyorGallery';
import { conveyorGallery } from '../../constants/code/Components/conveyorGalleryCode';
const DEFAULT_PROPS = { accent: '#e6a75b', surface: '#20201e', ink: '#fff3de' };
export default function ConveyorGalleryDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'ConveyorItem[]',
        default: 'undefined',
        description: 'Artwork cards; decorative copies are inert and hidden from accessibility APIs.'
      },
      {
        name: 'onSelect',
        type: '(item:ConveyorItem)=>void',
        default: 'undefined',
        description: 'Called from the accessible card list.'
      },
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
        default: '"#e6a75b"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#20201e"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#fff3de"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ConveyorGallery"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ConveyorGallery
              key={key}
              items={[
                { id: 'form', title: 'Form', content: '◒', color: '#e6a75b' },
                { id: 'space', title: 'Space', content: '✳', color: '#b7cbaa' },
                { id: 'color', title: 'Color', content: '◉', color: '#e6a3a3' },
                { id: 'type', title: 'Type', content: 'Aa', color: '#d9cbeb' }
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
          <CodeExample codeObject={conveyorGallery} componentName="ConveyorGallery" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
