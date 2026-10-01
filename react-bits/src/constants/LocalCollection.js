/** Local additions, not published to reactbits.dev. */
export const localCollection = [
  {
    name: 'ElasticTabs',
    title: 'Elastic Tabs',
    category: 'Micro',
    slug: 'elastic-tabs',
    style: 'Soft minimal / 柔和极简',
    description:
      'Soft segmented tabs with a spring-driven shared indicator, preserved panels and roving keyboard focus.',
    tags: ['tabs', 'minimal', 'spring', 'navigation', '柔和极简', '标签页'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/ElasticTabs/ElasticTabs.jsx',
    typedSource: 'src/ts-default/Micro/ElasticTabs/ElasticTabs.tsx',
    usage:
      "<ElasticTabs items={[{ id: 'design', label: 'Design', content: 'Your design panel' }, { id: 'code', label: 'Code', content: 'Your code panel' }]} onChange={id => console.log(id)} />",
    props: [
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
    ]
  },
  {
    name: 'OrbitSlider',
    title: 'Orbit Slider',
    category: 'Micro',
    slug: 'orbit-slider',
    style: 'Mint instrument / 薄荷仪表',
    description: 'Mint circular instrument with a spring orbit and native keyboard-accessible range input.',
    tags: ['range', 'slider', 'instrument', 'mint', '薄荷', '仪表'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/OrbitSlider/OrbitSlider.jsx',
    typedSource: 'src/ts-default/Micro/OrbitSlider/OrbitSlider.tsx',
    usage: '<OrbitSlider defaultValue={60} label="Volume" unit="%" onChange={value => console.log(value)} />',
    props: [
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value within min and max.' },
      { name: 'defaultValue', type: 'number', default: '60', description: 'Initial uncontrolled value.' },
      {
        name: 'onChange',
        type: '(value: number) => void',
        default: 'undefined',
        description: 'Input change callback.'
      },
      { name: 'min', type: 'number', default: '0', description: 'Minimum.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum; must exceed min.' },
      { name: 'step', type: 'number', default: '1', description: 'Positive native input increment.' },
      { name: 'label', type: 'string', default: "'Intensity'", description: 'Input and dial label.' },
      { name: 'unit', type: 'string', default: "'%'", description: 'Unit suffix.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#087f72"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#e4f4ec"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#133b31"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'RippleButton',
    title: 'Ripple Button',
    category: 'Micro',
    slug: 'ripple-button',
    style: 'Warm tactile / 暖色触感',
    description:
      'Warm tactile button with pointer-origin ripples, centered keyboard feedback and bounded animation nodes.',
    tags: ['button', 'ripple', 'warm', 'tactile', '暖色', '按钮'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/RippleButton/RippleButton.jsx',
    typedSource: 'src/ts-default/Micro/RippleButton/RippleButton.tsx',
    usage: "<RippleButton onClick={() => console.log('clicked')}>Explore now ↗</RippleButton>",
    props: [
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
    ]
  },
  {
    name: 'SpringAccordion',
    title: 'Spring Accordion',
    category: 'Micro',
    slug: 'spring-accordion',
    style: 'Editorial / 黑白编辑排版',
    description: 'Editorial ruled accordion with numbered headings and restrained spring expansion.',
    tags: ['accordion', 'editorial', 'minimal', 'typography', '编辑排版', '折叠'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/SpringAccordion/SpringAccordion.jsx',
    typedSource: 'src/ts-default/Micro/SpringAccordion/SpringAccordion.tsx',
    usage: "<SpringAccordion items={[{ id: 'faq', title: 'How does it work?', content: 'Your answer here.' }]} />",
    props: [
      {
        name: 'items',
        type: 'AccordionItem[]',
        default: 'undefined',
        description: 'Stable item ids, headings and content.'
      },
      {
        name: 'value',
        type: 'string | null',
        default: 'undefined',
        description: 'Controlled open id; null collapses all.'
      },
      { name: 'defaultValue', type: 'string | null', default: 'null', description: 'Initial open id.' },
      {
        name: 'onChange',
        type: '(id: string | null) => void',
        default: 'undefined',
        description: 'Expansion callback.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#252525"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f7f6f2"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#252525"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'ToastStack',
    title: 'Toast Stack',
    category: 'Micro',
    slug: 'toast-stack',
    style: 'Frosted glass / 玻璃浮层',
    description:
      'Frosted toast stack that unfolds on hover or keyboard focus, with inaccessible exit nodes and stable focus after dismissal.',
    tags: ['toast', 'glass', 'notification', 'stack', '玻璃', '提示'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/ToastStack/ToastStack.jsx',
    typedSource: 'src/ts-default/Micro/ToastStack/ToastStack.tsx',
    usage:
      '<ToastStack items={items} onDismiss={id => setItems(previous => previous.filter(item => item.id !== id))} />',
    props: [
      {
        name: 'items',
        type: 'ToastItemData[]',
        default: 'undefined',
        description: 'Caller-owned toasts, newest first. No implicit expiration or item cap.'
      },
      {
        name: 'onDismiss',
        type: '(id: string) => void',
        default: 'undefined',
        description: 'Caller removes the identified toast.'
      },
      { name: 'emptyText', type: 'string', default: "'All caught up.'", description: 'Text when the list is empty.' },
      { name: 'ariaLabel', type: 'string', default: "'Notifications'", description: 'Accessible stack name.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#098a73"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#effaf5"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#163d32"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'PostcardFlip',
    title: 'Postcard Flip',
    category: 'Micro',
    slug: 'postcard-flip',
    style: 'Travel postcard / 旅行明信片',
    description: 'A travel postcard with a sunburst cover, postal reverse and an accessible explicit flip control.',
    tags: ['card', 'flip', 'postcard', 'paper', '明信片', '旅行'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/PostcardFlip/PostcardFlip.jsx',
    typedSource: 'src/ts-default/Micro/PostcardFlip/PostcardFlip.tsx',
    usage: '<PostcardFlip title="Hello, summer" message="Wish you were here." from="With love, your team" />',
    props: [
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
    ]
  },
  {
    name: 'ArcadeButton',
    title: 'Arcade Button',
    category: 'Micro',
    slug: 'arcade-button',
    style: '8-bit arcade / 像素街机',
    description: 'Chunky arcade key with a stepped silhouette, hard offset shadow and physical press travel.',
    tags: ['pixel', 'arcade', 'button', 'retro', '街机', '像素'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/ArcadeButton/ArcadeButton.jsx',
    typedSource: 'src/ts-default/Micro/ArcadeButton/ArcadeButton.tsx',
    usage: '<ArcadeButton label="PLAY AGAIN" onClick={() => console.log(\'start\')} />',
    props: [
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
    ]
  },
  {
    name: 'PaperNote',
    title: 'Paper Note',
    category: 'Micro',
    slug: 'paper-note',
    style: 'Analog stationery / 手写便签',
    description: 'Editable ruled sticky note with a tape tab, live draft callback and pin-controlled paper tilt.',
    tags: ['paper', 'note', 'textarea', 'handwritten', '便签', '手写'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/PaperNote/PaperNote.jsx',
    typedSource: 'src/ts-default/Micro/PaperNote/PaperNote.tsx',
    usage: '<PaperNote defaultValue="Remember the little things." onChange={draft => console.log(draft)} />',
    props: [
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
    ]
  },
  {
    name: 'BauhausStepper',
    title: 'Bauhaus Stepper',
    category: 'Components',
    slug: 'bauhaus-stepper',
    style: 'Bauhaus geometry / 包豪斯几何',
    description: 'Primary-color geometric step selector with independent navigation and a sliding progress rule.',
    tags: ['steps', 'bauhaus', 'geometric', 'navigation', '包豪斯', '几何'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/BauhausStepper/BauhausStepper.jsx',
    typedSource: 'src/ts-default/Components/BauhausStepper/BauhausStepper.tsx',
    usage: "<BauhausStepper steps={['Explore', 'Build', 'Launch']} onChange={index => console.log(index)} />",
    props: [
      {
        name: 'steps',
        type: 'string[]',
        default: "['Discover', 'Make', 'Share']",
        description: 'Step labels in display order.'
      },
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled zero-based index.' },
      { name: 'defaultValue', type: 'number', default: '0', description: 'Initial index.' },
      {
        name: 'onChange',
        type: '(index: number) => void',
        default: 'undefined',
        description: 'Independent step selection callback.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#cf392e"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f2ebdf"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#242323"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'NeonToggle',
    title: 'Neon Toggle',
    category: 'Micro',
    slug: 'neon-toggle',
    style: 'Cyber hardware / 霓虹硬件',
    description: 'Hardware-inspired switch with a luminous LED lane, etched ticks and a spring slider.',
    tags: ['switch', 'neon', 'hardware', 'cyber', '霓虹', '开关'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/NeonToggle/NeonToggle.jsx',
    typedSource: 'src/ts-default/Micro/NeonToggle/NeonToggle.tsx',
    usage: '<NeonToggle label="AMBIENT LIGHT" onChange={checked => console.log(checked)} />',
    props: [
      { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled switch state.' },
      { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state.' },
      {
        name: 'onChange',
        type: '(checked: boolean) => void',
        default: 'undefined',
        description: 'Switch state callback.'
      },
      { name: 'label', type: 'string', default: "'SIGNAL'", description: 'Accessible switch name.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable switching.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#a6fa69"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#17201c"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#def6e5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'VinylDeck',
    title: 'Vinyl Deck',
    category: 'Components',
    slug: 'vinyl-deck',
    style: 'Analog record player / 复古黑胶',
    description:
      'Analog vinyl artwork with concentric grooves, a lifting tonearm and an explicit visual rotation control.',
    tags: ['vinyl', 'analog', 'music', 'rotation', '黑胶', '复古'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/VinylDeck/VinylDeck.jsx',
    typedSource: 'src/ts-default/Components/VinylDeck/VinylDeck.tsx',
    usage: '<VinylDeck title="Late afternoon" artist="Your studio / Side A" rpm={33} />',
    props: [
      { name: 'title', type: 'string', default: "'Slow Sunday'", description: 'Record title.' },
      { name: 'artist', type: 'string', default: "'Side A / Studio Sessions'", description: 'Record subtitle.' },
      {
        name: 'spinning',
        type: 'boolean',
        default: 'undefined',
        description: 'Controlled visual rotation; does not play audio.'
      },
      { name: 'defaultSpinning', type: 'boolean', default: 'false', description: 'Initial visual rotation state.' },
      {
        name: 'onChange',
        type: '(spinning: boolean) => void',
        default: 'undefined',
        description: 'Visual rotation callback.'
      },
      { name: 'rpm', type: 'number', default: '33', description: 'Rotation speed; positive revolutions per minute.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#e67846"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#e6dfd3"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#302a24"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'BubbleChoice',
    title: 'Bubble Choice',
    category: 'Micro',
    slug: 'bubble-choice',
    style: 'Candy pop / 糖果气泡',
    description: 'Candy-colored native radio group with round labels and a spring bubble around the selected choice.',
    tags: ['radio', 'choice', 'candy', 'playful', '糖果', '选择'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/BubbleChoice/BubbleChoice.jsx',
    typedSource: 'src/ts-default/Micro/BubbleChoice/BubbleChoice.tsx',
    usage:
      "<BubbleChoice options={['Calm', 'Bright', 'Dreamy']} defaultValue=\"Calm\" onChange={mood => console.log(mood)} />",
    props: [
      {
        name: 'options',
        type: 'string[]',
        default: "['Peach', 'Mint', 'Lavender']",
        description: 'Radio labels and values.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected value.' },
      { name: 'defaultValue', type: 'string', default: "'Peach'", description: 'Initial selection.' },
      { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Selection callback.' },
      { name: 'label', type: 'string', default: "'Pick your mood'", description: 'Group legend.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#c74f91"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff0f7"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#63334d"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'MonoCommand',
    title: 'Mono Command',
    category: 'Components',
    slug: 'mono-command',
    style: 'Monochrome utility / 单色工具',
    description:
      'A compact monochrome command surface with immediate search, native buttons, keyboard result navigation and recoverable empty state.',
    tags: ['command', 'search', 'monochrome', 'developer', '工具', '命令'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/MonoCommand/MonoCommand.jsx',
    typedSource: 'src/ts-default/Components/MonoCommand/MonoCommand.tsx',
    usage:
      "<MonoCommand items={[{ id: 'new', label: 'New project', shortcut: '⌘ N' }]} onSelect={item => console.log(item.id)} />",
    props: [
      {
        name: 'items',
        type: 'CommandItem[]',
        default: 'undefined',
        description: 'Available commands with stable ids.'
      },
      {
        name: 'onSelect',
        type: '(item: CommandItem) => void',
        default: 'undefined',
        description: 'Caller handles command execution.'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Find a command…'",
        description: 'Search placeholder and accessible label.'
      },
      {
        name: 'emptyText',
        type: 'string',
        default: "'No commands found. Try another search.'",
        description: 'Recovery guidance for an empty result.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#383838"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fafafa"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#262626"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'PixelMeter',
    title: 'Pixel Meter',
    category: 'Micro',
    slug: 'pixel-meter',
    style: 'Pixel synthesizer / 像素合成器',
    description: 'A pixel matrix meter with staggered cell response and a native stepped range control.',
    tags: ['pixel', 'meter', 'range', 'synth', '像素', '合成器'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/PixelMeter/PixelMeter.jsx',
    typedSource: 'src/ts-default/Micro/PixelMeter/PixelMeter.tsx',
    usage: '<PixelMeter label="LEVEL" max={16} defaultValue={8} onChange={level => console.log(level)} />',
    props: [
      { name: 'value', type: 'number', default: 'undefined', description: 'Controlled value from 0 through max.' },
      { name: 'defaultValue', type: 'number', default: '8', description: 'Initial value.' },
      {
        name: 'onChange',
        type: '(value: number) => void',
        default: 'undefined',
        description: 'Native input change callback.'
      },
      { name: 'max', type: 'number', default: '16', description: 'Positive integer maximum.' },
      { name: 'label', type: 'string', default: "'ENERGY'", description: 'Accessible meter label.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#c29cff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#201c30"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#f0e8ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'OrigamiNav',
    title: 'Origami Nav',
    category: 'Components',
    slug: 'origami-nav',
    style: 'Folded paper / 折纸导航',
    description: 'A paper-strip navigation that folds open from a stable trigger; collapsed links are inert.',
    tags: ['navigation', 'origami', 'paper', 'fold', '折纸', '导航'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/OrigamiNav/OrigamiNav.jsx',
    typedSource: 'src/ts-default/Components/OrigamiNav/OrigamiNav.tsx',
    usage: "<OrigamiNav items={[{ label: 'Work', href: '/work' }, { label: 'Contact', href: '/contact' }]} />",
    props: [
      {
        name: 'items',
        type: 'OrigamiLink[]',
        default: 'undefined',
        description: 'Navigation labels and destinations.'
      },
      { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled expansion.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial expansion.' },
      { name: 'onChange', type: '(open: boolean) => void', default: 'undefined', description: 'Expansion callback.' },
      { name: 'label', type: 'string', default: "'Explore the studio'", description: 'Trigger label.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#8469ad"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f0e7fc"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#453558"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'TerminalStatus',
    title: 'Terminal Status',
    category: 'Micro',
    slug: 'terminal-status',
    style: 'Phosphor terminal / 磷光终端',
    description:
      'A phosphor terminal status display driven by explicit caller-owned idle, running, success or error state.',
    tags: ['status', 'terminal', 'monospace', 'phosphor', '终端', '状态'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/TerminalStatus/TerminalStatus.jsx',
    typedSource: 'src/ts-default/Micro/TerminalStatus/TerminalStatus.tsx',
    usage: '<TerminalStatus status="running" label="IMPORT" detail="Reading your local files…" />',
    props: [
      {
        name: 'status',
        type: "'idle' | 'running' | 'success' | 'error'",
        default: "'idle'",
        description: 'Display state supplied by the caller; not a health probe.'
      },
      { name: 'label', type: 'string', default: "'BUILD PIPELINE'", description: 'Display label.' },
      {
        name: 'detail',
        type: 'string',
        default: "'Awaiting your next move.'",
        description: 'Status detail supplied by the caller.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#80e0a2"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#10241a"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#b3e8c5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'RibbonBadge',
    title: 'Ribbon Badge',
    category: 'Micro',
    slug: 'ribbon-badge',
    style: 'Vintage ribbon / 复古绶带',
    description: 'A vintage folded ribbon badge that reveals supporting content with an accessible disclosure button.',
    tags: ['badge', 'ribbon', 'vintage', 'disclosure', '绶带', '复古'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Micro/RibbonBadge/RibbonBadge.jsx',
    typedSource: 'src/ts-default/Micro/RibbonBadge/RibbonBadge.tsx',
    usage: '<RibbonBadge label="FOUNDING MEMBER" detail="Your early support means everything." />',
    props: [
      { name: 'label', type: 'string', default: "'A LITTLE EXTRA'", description: 'Ribbon caption.' },
      {
        name: 'detail',
        type: 'ReactNode',
        default: "'Made with care. Kept with love.'",
        description: 'Revealed supporting content.'
      },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial disclosure state.' },
      { name: 'onChange', type: '(open: boolean) => void', default: 'undefined', description: 'Disclosure callback.' },
      {
        name: 'accent',
        type: 'string',
        default: '"#ad473e"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#fff3e7"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#603b32"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'BlueprintPanel',
    title: 'Blueprint Panel',
    category: 'Components',
    slug: 'blueprint-panel',
    style: 'Technical blueprint / 技术蓝图',
    description:
      'A technical blueprint disclosure card with dimension annotations, grid paper and an expanding specification panel.',
    tags: ['blueprint', 'technical', 'card', 'disclosure', '蓝图', '技术'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/BlueprintPanel/BlueprintPanel.jsx',
    typedSource: 'src/ts-default/Components/BlueprintPanel/BlueprintPanel.tsx',
    usage:
      '<BlueprintPanel title="Prototype / 001" widthLabel="120 mm" heightLabel="80 mm">Your actual specifications.</BlueprintPanel>',
    props: [
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
    ]
  },
  {
    name: 'DepthLiftCard',
    title: 'Depth Lift Card',
    category: 'Components',
    slug: 'depth-lift-card',
    style: 'Holographic specimen / 全息标本',
    description:
      'A holographic card whose frame, rings and foreground rise at different depths while tracking the pointer. Tap or press Enter to hold the lifted view.',
    tags: ['3d', 'parallax', 'card', 'holographic', 'pointer', '空间', '分层'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/DepthLiftCard/DepthLiftCard.jsx',
    typedSource: 'src/ts-default/Components/DepthLiftCard/DepthLiftCard.tsx',
    usage:
      '<DepthLiftCard title="Your product" eyebrow="FEATURE / 01"><p>Your own content sits above the moving layers.</p></DepthLiftCard>',
    props: [
      { name: 'title', type: 'string', default: "'A new dimension'", description: 'Card heading.' },
      { name: 'eyebrow', type: 'string', default: "'SPECIMEN / 001'", description: 'Small label.' },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Move closer. Every layer has its own depth.'",
        description: 'Foreground content, including caller-owned links or buttons.'
      },
      {
        name: 'depth',
        type: 'number',
        default: '60',
        description: 'Foreground lift in pixels; finite nonnegative values.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#af9aff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#151223"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#f5f1ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'PrismDeck',
    title: 'Prism Deck',
    category: 'Components',
    slug: 'prism-deck',
    style: 'Iridescent editorial / 虹彩编辑卡组',
    description:
      'Selectable panels fan out in perspective and exchange front-to-back positions with a spring. Arrow keys and direct tabs reach every panel.',
    tags: ['tabs', 'deck', '3d', 'spring', 'iridescent', '卡组', '切换'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/PrismDeck/PrismDeck.jsx',
    typedSource: 'src/ts-default/Components/PrismDeck/PrismDeck.tsx',
    usage:
      "<PrismDeck items={[{id:'design',label:'Design',title:'Build your idea.',content:<p>Your first panel.</p>},{id:'code',label:'Code',title:'Make it yours.',content:<p>Your second panel.</p>}]} onChange={id=>console.log(id)}/>",
    props: [
      {
        name: 'items',
        type: 'PrismPanel[]',
        default: 'undefined',
        description: 'Panels with stable unique ids and caller content.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected panel id.' },
      {
        name: 'defaultValue',
        type: 'string',
        default: "''",
        description: 'Initial selection; invalid ids display the first item.'
      },
      {
        name: 'onChange',
        type: '(id:string)=>void',
        default: 'undefined',
        description: 'Called for direct user selection.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#b9a4ff"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#171320"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#fbf7ff"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'ApertureReveal',
    title: 'Aperture Reveal',
    category: 'Components',
    slug: 'aperture-reveal',
    style: 'Swiss gallery / 瑞士画廊',
    description:
      'A circular aperture opens through an editorial cover to reveal real content. Pointer, focus and an explicit toggle share the same reversible reveal.',
    tags: ['reveal', 'mask', 'aperture', 'editorial', 'card', '圆形揭幕', '遮罩'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/ApertureReveal/ApertureReveal.jsx',
    typedSource: 'src/ts-default/Components/ApertureReveal/ApertureReveal.tsx',
    usage: '<ApertureReveal title="OPEN STUDIO"><div>Your revealed content.</div></ApertureReveal>',
    props: [
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
    ]
  },
  {
    name: 'OrbitStage',
    title: 'Orbit Stage',
    category: 'Components',
    slug: 'orbit-stage',
    style: 'Solar observatory / 太阳观测站',
    description:
      'Caller-provided subjects orbit a central stage. Select any subject to update the central content; pause, focus or reduced motion freezes the orbits without losing selection.',
    tags: ['orbit', 'radial', 'selection', 'solar', 'continuous', '轨道', '连续运动'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/OrbitStage/OrbitStage.jsx',
    typedSource: 'src/ts-default/Components/OrbitStage/OrbitStage.tsx',
    usage:
      "<OrbitStage items={[{id:'one',label:'Design',symbol:'✦',content:'Your first subject.'},{id:'two',label:'Build',symbol:'◉',content:'Your second subject.'}]} speed={1}/>",
    props: [
      {
        name: 'items',
        type: 'OrbitSubject[]',
        default: 'undefined',
        description: 'Subjects with stable ids; the first six orbit, all remain in the subject list.'
      },
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected subject id.' },
      { name: 'defaultValue', type: 'string', default: "''", description: 'Initial selected id.' },
      { name: 'onChange', type: '(id:string)=>void', default: 'undefined', description: 'Subject selection callback.' },
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
        default: '"#ffb86b"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#181411"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#fff3e6"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'ScrollTheater',
    title: 'Scroll Theater',
    category: 'Components',
    slug: 'scroll-theater',
    style: 'Constructivist poster / 构成主义剧场',
    description:
      'A scrollable scene with a poster plane, foreground disc and headline moving at different depths. Native scene buttons provide the same destinations without wheel gestures.',
    tags: ['scroll', 'parallax', 'perspective', 'poster', 'kinetic', '滚动', '视差'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/ScrollTheater/ScrollTheater.jsx',
    typedSource: 'src/ts-default/Components/ScrollTheater/ScrollTheater.tsx',
    usage:
      "<ScrollTheater items={[{id:'a',title:'First act',content:'Your opening.'},{id:'b',title:'Second act',content:'Your next scene.'}]} height={400}/>",
    props: [
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
    ]
  },
  {
    name: 'BeamPath',
    title: 'Beam Path',
    category: 'Components',
    slug: 'beam-path',
    style: 'Electric circuit / 电路光束',
    description:
      'Animated packets travel on curved SVG paths into a glowing hub. Caller labels and real children stay independent of the decorative circuit.',
    tags: ['beam', 'svg', 'path', 'flow', 'continuous', 'light', '光束', '路径'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/BeamPath/BeamPath.jsx',
    typedSource: 'src/ts-default/Components/BeamPath/BeamPath.tsx',
    usage:
      "<BeamPath title=\"Your system\" labels={['Input','Plan','Draft','Review','Export','Share']} speed={1.2}><p>Your actual workflow content.</p></BeamPath>",
    props: [
      { name: 'title', type: 'string', default: "'All paths connect.'", description: 'Central heading.' },
      {
        name: 'labels',
        type: 'string[]',
        default: "['Ideas', 'Design', 'Motion', 'Build', 'Share', 'Ship']",
        description: 'Up to six circuit endpoint labels.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: "'Bring your own workflow.'",
        description: 'Content below the central heading; this illustration performs no workflow.'
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
        default: '"#54e7b0"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#0d1917"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#eefbf5"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'KineticTiles',
    title: 'Kinetic Tiles',
    category: 'Components',
    slug: 'kinetic-tiles',
    style: 'Neo brutalist playground / 新粗野主义操场',
    description:
      'A grid ripples away from the pointer: nearby tiles lift, rotate and spring apart. Keyboard focus lifts a tile and selection is a caller callback.',
    tags: ['grid', 'pointer', 'repulsion', 'spring', 'brutalist', '磁场', '网格'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/KineticTiles/KineticTiles.jsx',
    typedSource: 'src/ts-default/Components/KineticTiles/KineticTiles.tsx',
    usage:
      "<KineticTiles items={[{id:'design',label:'Design',symbol:'✦'},{id:'code',label:'Code',symbol:'◉'}]} onSelect={item=>console.log(item.id)}/>",
    props: [
      {
        name: 'items',
        type: 'KineticItem[]',
        default: 'undefined',
        description: 'Grid items with stable ids and accessible labels.'
      },
      {
        name: 'onSelect',
        type: '(item:KineticItem)=>void',
        default: 'undefined',
        description: 'User activation callback.'
      },
      {
        name: 'strength',
        type: 'number',
        default: '28',
        description: 'Maximum lift in pixels; finite nonnegative values.'
      },
      {
        name: 'accent',
        type: 'string',
        default: '"#edff7a"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#f3f0e8"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#151515"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  },
  {
    name: 'ConveyorGallery',
    title: 'Conveyor Gallery',
    category: 'Components',
    slug: 'conveyor-gallery',
    style: 'Analog film strip / 模拟胶片',
    description:
      'A continuous diagonal film strip carries caller artwork. Hover or keyboard focus pauses it; every original card remains accessible in a static list.',
    tags: ['marquee', 'film', 'gallery', 'continuous', 'diagonal', '胶片', '连续运动'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/ConveyorGallery/ConveyorGallery.jsx',
    typedSource: 'src/ts-default/Components/ConveyorGallery/ConveyorGallery.tsx',
    usage:
      "<ConveyorGallery items={[{id:'one',title:'First frame',content:<span>✳</span>},{id:'two',title:'Second frame',content:<span>◒</span>}]} speed={1}/>",
    props: [
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
    ]
  },
  {
    name: 'LiquidAction',
    title: 'Liquid Action',
    category: 'Components',
    slug: 'liquid-action',
    style: 'Liquid candy / 液态糖果',
    description:
      'A spring-following action sits inside orbiting liquid droplets. Hover or keyboard focus merges the droplets into a wide halo; activation belongs to the caller.',
    tags: ['button', 'liquid', 'gooey', 'magnetic', 'continuous', '液态', '糖果'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/LiquidAction/LiquidAction.jsx',
    typedSource: 'src/ts-default/Components/LiquidAction/LiquidAction.tsx',
    usage: '<LiquidAction label="Start creating" onClick={()=>console.log(\'Caller action\')} speed={1}/>',
    props: [
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
    ]
  },
  {
    name: 'ShutterText',
    title: 'Shutter Text',
    category: 'Components',
    slug: 'shutter-text',
    style: 'Split shutter typography / 百叶窗字排',
    description:
      'Large words exchange through alternating 3D shutter rows on a clock. Every word is directly selectable, with pause and reduced-motion alternatives.',
    tags: ['typography', '3d', 'shutter', 'words', 'continuous', '文字', '百叶窗'],
    dependencies: ['react', 'motion'],
    variants: ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'],
    source: 'src/content/Components/ShutterText/ShutterText.jsx',
    typedSource: 'src/ts-default/Components/ShutterText/ShutterText.tsx',
    usage: "<ShutterText words={['CREATE.','EXPLORE.','SHIP.']} interval={3} onChange={word=>console.log(word)}/>",
    props: [
      {
        name: 'words',
        type: 'string[]',
        default: "['MOVE.', 'PLAY.', 'MAKE.']",
        description: 'Words to rotate; empty data has a stable recovery state.'
      },
      {
        name: 'interval',
        type: 'number',
        default: '3',
        description: 'Seconds per word; values below 1 or non-finite use 1 or 3 respectively.'
      },
      {
        name: 'onChange',
        type: '(word:string)=>void',
        default: 'undefined',
        description: 'Direct user selection callback; autoplay is decorative.'
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
        default: '"#f4ff76"',
        description: 'Accent color; independent of the host theme.'
      },
      { name: 'surface', type: 'string', default: '"#272846"', description: 'Component surface color.' },
      { name: 'ink', type: 'string', default: '"#f8f6ee"', description: 'Primary text color.' },
      { name: 'className', type: 'string', default: "''", description: 'Optional class on the component root.' }
    ]
  }
];
export const localCollectionMetadata = Object.fromEntries(
  localCollection.map((item) => [
    item.category + '/' + item.name,
    {
      name: item.name,
      category: item.category,
      description: item.description,
      tags: item.tags,
      added: '2026-09-30',
      videoUrl: '',
      docsUrl: 'http://localhost:5290/' + item.category.toLowerCase() + '/' + item.slug,
      meta: { origin: 'local', style: item.style }
    }
  ])
);
