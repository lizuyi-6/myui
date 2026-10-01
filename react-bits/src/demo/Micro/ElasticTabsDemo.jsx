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
import ElasticTabs from '../../content/Micro/ElasticTabs/ElasticTabs';
import { elasticTabs } from '../../constants/code/Micro/elasticTabsCode';
const DEFAULT_PROPS = { accent: '#d97745', surface: '#fff8f1', ink: '#3b2d24' };
export default function ElasticTabsDemo() {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'ElasticTab[]',
        default: 'undefined',
        description: 'Stable ids, tab labels and panel content.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected id.' },
      {
        name: 'defaultValue',
        type: 'string',
        default: 'undefined',
        description: 'Initial id; defaults to the first item.'
      },
      { name: 'onChange', type: '(id: string) => void', default: 'undefined', description: 'Selection callback.' },
      { name: 'ariaLabel', type: 'string', default: "'Explore'", description: 'Accessible name for the tab list.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#d97745"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff8f1"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#3b2d24"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ],
    []
  );
  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            data-local-component="ElasticTabs"
            className="demo-container"
            minH="420px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            padding="32px"
            overflow="visible"
          >
            <ElasticTabs
              key={key}
              items={[
                { id: 'design', label: 'Design', content: 'A softer place for your ideas.' },
                { id: 'motion', label: 'Motion', content: 'Spring into your next idea.' },
                { id: 'code', label: 'Code', content: 'Copy it. Make it yours.' }
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
          <CodeExample codeObject={elasticTabs} componentName="ElasticTabs" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
}
