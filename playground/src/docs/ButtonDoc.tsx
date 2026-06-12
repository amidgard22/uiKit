import { Button } from '@uikit/react';
import { ApiTable, type ApiTableRow } from './ApiTable';
import {
  DocApiSection,
  DocDivider,
  DocHeader,
  DocRow,
  DocSection,
} from './DocPrimitives';

const buttonApiRows: ApiTableRow[] = [
  {
    property: 'variant',
    description: 'Визуальный стиль кнопки',
    type: `'primary' | 'secondary' | 'ghost' | 'danger'`,
    default: 'primary',
  },
  {
    property: 'size',
    description: 'Размер кнопки и текста',
    type: `'sm' | 'md' | 'lg'`,
    default: 'md',
  },
  {
    property: 'shape',
    description: 'Форма скругления',
    type: `'default' | 'circle' | 'round'`,
    default: 'default',
  },
  {
    property: 'borderType',
    description: 'Стиль обводки',
    type: `'outline' | 'dashed' | 'solid' | 'filled'`,
    default: 'filled',
  },
  {
    property: 'loading',
    description: 'Состояние загрузки, блокирует клик',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'loadingText',
    description: 'Текст во время загрузки вместо children',
    type: 'ReactNode',
  },
  {
    property: 'loadingIcon',
    description: 'Кастомный индикатор загрузки',
    type: 'ReactNode',
  },
  {
    property: 'leftIcon',
    description: 'Иконка слева от текста',
    type: 'ReactNode',
  },
  {
    property: 'rightIcon',
    description: 'Иконка справа от текста',
    type: 'ReactNode',
  },
  {
    property: 'htmlType',
    description: 'Нативный type для элемента button',
    type: `'button' | 'submit' | 'reset'`,
    default: 'button',
  },
  {
    property: 'href',
    description: 'При наличии рендерится тег a вместо button',
    type: 'string',
  },
  {
    property: 'target',
    description: 'Атрибут target для ссылки',
    type: 'string',
  },
  {
    property: 'rel',
    description: 'Атрибут rel для ссылки',
    type: 'string',
  },
  {
    property: 'disabled',
    description: 'Отключает взаимодействие',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Дополнительные CSS-классы (cn + tailwind-merge)',
    type: 'string',
  },
  {
    property: 'onClick',
    description: 'Обработчик клика',
    type: 'MouseEventHandler<HTMLButtonElement>',
  },
];

export function ButtonDoc() {
  return (
    <>
      <DocHeader
        title="Button"
        description="Кнопка с вариантами стилей, размерами, иконками, состоянием загрузки и режимом ссылки."
      />

      <DocSection
        id="variant"
        title="Variant"
        description="Визуальный стиль кнопки. Проп: variant."
      >
        <DocRow>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="danger">danger</Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="size"
        title="Size"
        description="Размер кнопки и font-size. Иконки масштабируются через 1em. Проп: size."
      >
        <DocRow label="sm · md · lg">
          <Button size="sm" leftIcon={<span>👋</span>}>
            Small
          </Button>
          <Button size="md" leftIcon={<span>👋</span>}>
            Medium
          </Button>
          <Button size="lg" leftIcon={<span>👋</span>}>
            Large
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="shape"
        title="Shape"
        description="Форма скругления. Проп: shape."
      >
        <DocRow>
          <Button shape="default">default</Button>
          <Button shape="round">round</Button>
          <Button shape="circle" className="px-3">
            ●
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="border-type"
        title="Border type"
        description="Стиль обводки. Проп: borderType."
      >
        <DocRow>
          <Button variant="secondary" borderType="filled">
            filled
          </Button>
          <Button variant="secondary" borderType="outline">
            outline
          </Button>
          <Button variant="secondary" borderType="dashed">
            dashed
          </Button>
          <Button variant="secondary" borderType="solid">
            solid
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="icons"
        title="Icons"
        description="Слоты leftIcon и rightIcon. При loading скрываются."
      >
        <DocRow label="leftIcon">
          <Button variant="primary" leftIcon={<span>👋</span>}>
            С иконкой слева
          </Button>
        </DocRow>
        <DocDivider />
        <DocRow label="rightIcon">
          <Button variant="primary" rightIcon={<span>👋</span>}>
            С иконкой справа
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="loading"
        title="Loading"
        description="loading блокирует кнопку. loadingText заменяет children. loadingIcon — кастомный индикатор."
      >
        <DocRow label="Дефолтный спиннер">
          <Button loading>Загрузка</Button>
        </DocRow>
        <DocDivider />
        <DocRow label="loadingText">
          <Button loading loadingText="Сохранение…">
            Сохранить
          </Button>
        </DocRow>
        <DocDivider />
        <DocRow label="loadingIcon">
          <Button loading loadingIcon={<span className="animate-spin">⏳</span>}>
            Кастомная иконка
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="disabled"
        title="Disabled"
        description="disabled отключает взаимодействие."
      >
        <DocRow>
          <Button disabled>disabled</Button>
          <Button variant="secondary" disabled>
            secondary disabled
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="link-button"
        title="Link button"
        description="При href рендерится <a>. target и rel — для внешних ссылок. disabled убирает href."
      >
        <DocRow label="Активная ссылка">
          <Button
            variant="primary"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
        </DocRow>
        <DocDivider />
        <DocRow label="disabled + href">
          <Button variant="primary" disabled href="https://github.com">
            Не кликабельна
          </Button>
        </DocRow>
      </DocSection>

      <DocSection
        id="customization"
        title="Кастомизация"
        description="className переопределяет стили через cn() + tailwind-merge. Меняй height и font-size вместе."
      >
        <DocRow label="h-14 + text-lg">
          <Button className="h-14 px-8 text-lg" leftIcon={<span>👋</span>}>
            Крупная кнопка
          </Button>
        </DocRow>
      </DocSection>

      <DocApiSection
        id="api"
        componentName="Button"
        note="Также поддерживаются стандартные атрибуты button, кроме type — используйте htmlType."
      >
        <ApiTable rows={buttonApiRows} />
      </DocApiSection>
    </>
  );
}
