export type DocComponentId = 'button' | 'input' | 'card';

export type DocSectionLink = {
  id: string;
  title: string;
};

export type DocComponentEntry = {
  id: DocComponentId;
  label: string;
  available: boolean;
  sections: DocSectionLink[];
};

export const DOC_COMPONENTS: DocComponentEntry[] = [
  {
    id: 'button',
    label: 'Button',
    available: true,
    sections: [
      { id: 'variant', title: 'Variant' },
      { id: 'size', title: 'Size' },
      { id: 'shape', title: 'Shape' },
      { id: 'border-type', title: 'Border type' },
      { id: 'icons', title: 'Icons' },
      { id: 'loading', title: 'Loading' },
      { id: 'disabled', title: 'Disabled' },
      { id: 'link-button', title: 'Link button' },
      { id: 'customization', title: 'Кастомизация' },
      { id: 'api', title: 'API' },
    ],
  },
  {
    id: 'input',
    label: 'Input',
    available: true,
    sections: [
      { id: 'basic', title: 'Basic' },
      { id: 'label', title: 'Label' },
      { id: 'error-message', title: 'Error message' },
      { id: 'status', title: 'Status' },
      { id: 'prefix-suffix', title: 'Prefix & suffix' },
      { id: 'allow-clear', title: 'Allow clear' },
      { id: 'input-password', title: 'InputPassword' },
      { id: 'input-number', title: 'InputNumber' },
      { id: 'size', title: 'Size' },
      { id: 'border-type', title: 'Border type' },
      { id: 'shape', title: 'Shape' },
      { id: 'disabled', title: 'Disabled' },
      { id: 'api', title: 'API Input' },
      { id: 'api-password', title: 'API InputPassword' },
      { id: 'api-number', title: 'API InputNumber' },
    ],
  },
  {
    id: 'card',
    label: 'Card',
    available: true,
    sections: [
      { id: 'basic', title: 'Basic' },
      { id: 'extra', title: 'Extra' },
      { id: 'cover', title: 'Cover' },
      { id: 'actions', title: 'Actions' },
      { id: 'variant', title: 'Variant' },
      { id: 'size', title: 'Size' },
      { id: 'hoverable', title: 'Hoverable' },
      { id: 'loading', title: 'Loading' },
      { id: 'api', title: 'API' },
    ],
  },
];

export function getDocComponent(id: DocComponentId) {
  return DOC_COMPONENTS.find((item) => item.id === id);
}
