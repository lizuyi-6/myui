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
import ApertureReveal from '../../content/Components/ApertureReveal/ApertureReveal';
import { apertureReveal } from '../../constants/code/Components/apertureRevealCode';
const DEFAULT_PROPS = { accent: '#ff603f', surface: '#ede7dc', ink: '#21211f' };
export default function ApertureRevealDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'title', type: 'string', default: "'LOOK INSIDE'", description: 'Cover headline.' },
      { name: 'subtitle', type: 'string', default: "'A different point of view.'", description: 'Cover subtitle.' },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Your content. Revealed.'",
        description: 'Underlying content, available after the cover is opened.'
      },
      { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled persistent reveal state.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial persistent state.' },
      {
        name: 'onChange',
        type: '(open:boolean)=>void',
        default: 'undefined',
        description: 'Called when the toggle changes persistent state.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#ff603f"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#ede7dc"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#21211f"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ApertureReveal"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ApertureReveal key={key} {...props}>
              <span>
                See beyond
                <br />
                the surface.
              </span>
            </ApertureReveal>
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
          <CodeExample codeObject={apertureReveal} componentName="ApertureReveal" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
