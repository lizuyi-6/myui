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
import PostcardFlip from '../../content/Micro/PostcardFlip/PostcardFlip';
import { postcardFlip } from '../../constants/code/Micro/postcardFlipCode';
const DEFAULT_PROPS = { accent: '#ce5739', surface: '#fff3dc', ink: '#574534' };
export default function PostcardFlipDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'Somewhere sunny'", description: 'Cover title.' },
      {
        name: 'message',
        type: 'string',
        default: "'A little hello from the other side.'",
        description: 'Reverse message.'
      },
      { name: 'from', type: 'string', default: "'With love, Studio'", description: 'Reverse signature.' },
      { name: 'flipped', type: 'boolean', default: 'undefined', description: 'Controlled face state.' },
      { name: 'defaultFlipped', type: 'boolean', default: 'false', description: 'Initial face state.' },
      { name: 'onChange', type: '(flipped: boolean) => void', default: 'undefined', description: 'Flip callback.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ce5739"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff3dc"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#574534"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="PostcardFlip"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <PostcardFlip key={key} {...props} />
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
          <CodeExample codeObject={postcardFlip} componentName="PostcardFlip" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
