import code from '@content/Micro/ToastStack/ToastStack.jsx?raw';
import css from '@content/Micro/ToastStack/ToastStack.css?raw';
import tailwind from '@tailwind/Micro/ToastStack/ToastStack.jsx?raw';
import tsCode from '@ts-default/Micro/ToastStack/ToastStack.tsx?raw';
import tsTailwind from '@ts-tailwind/Micro/ToastStack/ToastStack.tsx?raw';
export const toastStack = {
  dependencies: 'motion',
  usage:
    "import ToastStack from './ToastStack';\nimport { useState } from 'react';\n\nexport default function Example() {\nconst [items, setItems] = useState([{ id: 'one', title: 'A tiny win', message: 'Keep that good idea.' }, { id: 'two', title: 'You have room to explore', message: 'Hover or focus to unfold.' }]);\nreturn (<ToastStack items={items} onDismiss={id => setItems(previous => previous.filter(item => item.id !== id))} />);\n}",
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
