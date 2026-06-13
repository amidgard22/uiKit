import { useState } from 'react';
import { ButtonDoc } from './docs/ButtonDoc';
import { CardDoc } from './docs/CardDoc';
import { InputDoc } from './docs/InputDoc';
import { DocLayout } from './docs/DocLayout';
import { getDocComponent, type DocComponentId } from './docs/registry';

export default function App() {
  const [activeComponent, setActiveComponent] =
    useState<DocComponentId>('button');

  const entry = getDocComponent(activeComponent);
  const sections = entry?.sections ?? [];

  const handleComponentChange = (id: DocComponentId) => {
    setActiveComponent(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <DocLayout
      activeComponent={activeComponent}
      onComponentChange={handleComponentChange}
      sections={sections}
    >
      {activeComponent === 'button' && <ButtonDoc />}
      {activeComponent === 'input' && <InputDoc />}
      {activeComponent === 'card' && <CardDoc />}
    </DocLayout>
  );
}
