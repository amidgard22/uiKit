import { useState } from 'react';
import { Input, InputNumber, InputPassword } from '@uikit/react';
import { ApiTable, type ApiTableRow } from './ApiTable';
import {
  DocApiSection,
  DocDivider,
  DocHeader,
  DocRow,
  DocSection,
} from './DocPrimitives';

const inputApiRows: ApiTableRow[] = [
  {
    property: 'size',
    description: 'Размер поля',
    type: `'sm' | 'md' | 'lg'`,
    default: 'md',
  },
  {
    property: 'borderType',
    description: 'Стиль обводки',
    type: `'outline' | 'borderless' | 'filled'`,
    default: 'outline',
  },
  {
    property: 'shape',
    description: 'Скругление углов',
    type: `'default' | 'round'`,
    default: 'round',
  },
  {
    property: 'variant',
    description: 'Визуальный вариант',
    type: `'default'`,
    default: 'default',
  },
  {
    property: 'label',
    description: 'Подпись над полем, связана с input через htmlFor / id',
    type: 'string',
  },
  {
    property: 'labelClassName',
    description:
      'Доп. классы только на label (объединяются с дефолтными через cn)',
    type: 'string',
  },
  {
    property: 'errorMessage',
    description: 'Текст ошибки под полем',
    type: 'string',
  },
  {
    property: 'errorMessageClassName',
    description: 'Доп. классы на текст ошибки (дефолт: text-sm text-danger)',
    type: 'string',
  },
  {
    property: 'status',
    description:
      'Визуальное состояние обводки. error перекрывает warning. errorMessage тоже включает error',
    type: `'default' | 'error' | 'warning'`,
    default: 'default',
  },
  {
    property: 'prefix',
    description: 'Контент слева внутри поля (иконка, текст)',
    type: 'ReactNode',
  },
  {
    property: 'suffix',
    description:
      'Контент справа внутри поля. Если передан — allowClear не показывается',
    type: 'ReactNode',
  },
  {
    property: 'allowClear',
    description:
      'Кнопка очистки справа. Требует controlled value + onChange. Скрывается при suffix',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onClear',
    description: 'Колбэк после очистки',
    type: '() => void',
  },
  {
    property: 'disabled',
    description: 'Отключает поле',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'placeholder',
    description: 'Подсказка в пустом поле',
    type: 'string',
  },
  {
    property: 'className',
    description: 'Классы на обёртку (label + input)',
    type: 'string',
  },
  {
    property: 'inputClassName',
    description: 'Доп. классы только на input',
    type: 'string',
  },
];

const inputPasswordApiRows: ApiTableRow[] = [
  {
    property: 'visibilityToggle',
    description:
      'Кнопка показать/скрыть. Скрывается при custom prefix (left) или suffix (right)',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'eyeIcon',
    description: 'Иконка «показать» (пароль скрыт)',
    type: 'ReactNode',
  },
  {
    property: 'eyeIconHidden',
    description: 'Иконка «скрыть» (пароль виден)',
    type: 'ReactNode',
  },
  {
    property: 'eyeIconClassName',
    description: 'Tailwind-классы на кнопку toggle',
    type: 'string',
  },
  {
    property: 'eyeIconPosition',
    description: 'Позиция кнопки внутри поля',
    type: `'left' | 'right'`,
    default: 'right',
  },
  {
    property: 'eyeIconSize',
    description: 'Размер иконки',
    type: `'sm' | 'md' | 'lg'`,
    default: 'md',
  },
  {
    property: 'eyeIconColor',
    description: 'CSS color текста/иконки',
    type: 'string',
  },
  {
    property: 'eyeIconBgColor',
    description: 'CSS background кнопки',
    type: 'string',
  },
  {
    property: 'eyeIconBorderColor',
    description: 'CSS border-color',
    type: 'string',
  },
  {
    property: 'eyeIconBorderRadius',
    description: 'CSS border-radius',
    type: 'string',
  },
  {
    property: 'eyeIconBorderWidth',
    description: 'CSS border-width',
    type: 'string',
  },
  {
    property: 'eyeIconBorderStyle',
    description: 'CSS border-style',
    type: 'string',
  },
  ...inputApiRows,
];

const inputNumberApiRows: ApiTableRow[] = [
  {
    property: 'value',
    description: 'Controlled-значение',
    type: 'number | null',
  },
  {
    property: 'onChange',
    description: 'Колбэк при изменении',
    type: '(value: number | null) => void',
  },
  {
    property: 'min',
    description: 'Минимальное значение',
    type: 'number',
  },
  {
    property: 'max',
    description: 'Максимальное значение',
    type: 'number',
  },
  {
    property: 'step',
    description: 'Шаг для стрелок и нативного input',
    type: 'number',
  },
  {
    property: 'controls',
    description: 'Кастомные стрелки ▲▼ (по умолчанию true). Скрываются при suffix',
    type: 'boolean',
  },
  {
    property: 'upIcon',
    description: 'Иконка кнопки увеличения',
    type: 'ReactNode',
  },
  {
    property: 'downIcon',
    description: 'Иконка кнопки уменьшения',
    type: 'ReactNode',
  },
  {
    property: 'controlsClassName',
    description: 'Класс контейнера стрелок',
    type: 'string',
  },
  ...inputApiRows.filter(
    (row) =>
      row.property !== 'placeholder' &&
      row.property !== 'allowClear' &&
      row.property !== 'onClear',
  ),
  {
    property: 'placeholder',
    description: 'Подсказка в пустом поле',
    type: 'string',
  },
];

function AllowClearDemo() {
  const [value, setValue] = useState('Поисковый запрос');

  return (
    <Input
      className="max-w-xs"
      allowClear
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Введите текст"
    />
  );
}

function AllowClearWithSuffixDemo() {
  const [value, setValue] = useState('1000');

  return (
    <Input
      className="max-w-xs"
      allowClear
      suffix={<span>₽</span>}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="0"
    />
  );
}

function InputNumberDemo() {
  const [value, setValue] = useState<number | null>(1000);

  return (
    <InputNumber
      className="max-w-xs"
      label="Сумма"
      value={value}
      onChange={setValue}
      min={0}
      max={10000}
      step={100}
      placeholder="0"
    />
  );
}

function InputPasswordClearDemo() {
  const [value, setValue] = useState('secret');

  return (
    <InputPassword
      className="max-w-xs"
      allowClear
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Пароль"
    />
  );
}

export function InputDoc() {
  return (
    <>
      <DocHeader
        title="Input"
        description="Текстовое поле (только text). Для пароля и чисел — InputPassword и InputNumber."
      />

      <DocSection
        id="basic"
        title="Basic"
        description="Стандартное поле с placeholder."
      >
        <DocRow>
          <Input className="max-w-xs" placeholder="Введите текст" />
        </DocRow>
      </DocSection>

      <DocSection
        id="label"
        title="Label"
        description="Проп label — подпись над полем. labelClassName кастомизирует только подпись, не трогая input."
      >
        <DocRow label="С placeholder">
          <Input
            className="max-w-xs"
            label="Email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="Без placeholder — только label">
          <Input className="max-w-xs" label="Имя пользователя" />
        </DocRow>
        <DocDivider />
        <DocRow label="disabled + label">
          <Input
            className="max-w-xs"
            label="Телефон"
            disabled
            placeholder="+7 ..."
          />
        </DocRow>
        <DocDivider />
        <DocRow label="labelClassName — сравни с дефолтом">
          <Input
            className="w-44"
            label="Обычный label"
            placeholder="без labelClassName"
          />
          <Input
            className="w-44"
            label="Кастомный label"
            labelClassName="text-base font-bold text-accent"
            placeholder="с labelClassName"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="labelClassName — один проп, разный вид">
          <Input
            className="max-w-xs"
            label="Обязательное поле"
            labelClassName="after:ml-0.5 after:text-danger after:content-['*']"
            placeholder="звёздочка через after:content"
          />
        </DocRow>
      </DocSection>

      <DocSection
        id="error-message"
        title="Error message"
        description="Проп errorMessage — красный текст и border-danger. При фокусе ring отключён, остаётся только красная обводка."
      >
        <DocRow label="label + errorMessage">
          <Input
            className="max-w-xs"
            label="Email"
            autoComplete="email"
            defaultValue="not-an-email"
            errorMessage="Неверный формат email"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="без label — только ошибка">
          <InputPassword
            className="max-w-xs"
            placeholder="Пароль"
            errorMessage="Минимум 8 символов"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="errorMessageClassName">
          <Input
            className="max-w-xs"
            label="Логин"
            defaultValue="ab"
            errorMessage="Слишком короткий логин"
            errorMessageClassName="text-xs font-medium uppercase tracking-wide"
          />
        </DocRow>
      </DocSection>

      <DocSection
        id="status"
        title="Status"
        description='status меняет цвет обводки. warning — янтарный, error — красный. errorMessage и status="error" сильнее warning.'
      >
        <DocRow label='status="warning"'>
          <Input
            className="max-w-xs"
            label="Никнейм"
            status="warning"
            defaultValue="admin"
            placeholder="username"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="warning + errorMessage → побеждает error">
          <Input
            className="max-w-xs"
            label="Email"
            status="warning"
            defaultValue="bad"
            errorMessage="Неверный формат"
          />
        </DocRow>
      </DocSection>

      <DocSection
        id="prefix-suffix"
        title="Prefix & suffix"
        description="Иконки или текст внутри обводки поля. Общий border на обёртке, focus-within на всём блоке. suffix и allowClear вместе не работают — suffix скрывает clear."
      >
        <DocRow label="prefix">
          <Input
            className="max-w-xs"
            prefix={<span>🔍</span>}
            placeholder="Поиск"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="suffix">
          <InputNumber
            className="max-w-xs"
            suffix={<span>₽</span>}
            defaultValue={0}
            placeholder="0"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="prefix + suffix">
          <Input
            className="max-w-xs"
            label="Сумма"
            prefix={<span>₽</span>}
            suffix={<span>₽</span>}
            placeholder="1000"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="prefix + errorMessage">
          <Input
            className="max-w-xs"
            prefix={<span>@</span>}
            placeholder="username"
            errorMessage="Логин занят"
          />
        </DocRow>
      </DocSection>

      <DocSection
        id="allow-clear"
        title="Allow clear"
        description="allowClear — крестик для очистки. Работает только с value + onChange (controlled). Если задан suffix, кнопка clear не показывается — приоритет у custom suffix."
      >
        <DocRow label="allowClear + controlled">
          <AllowClearDemo />
        </DocRow>
        <DocDivider />
        <DocRow label="allowClear + suffix → clear скрыт">
          <AllowClearWithSuffixDemo />
        </DocRow>
      </DocSection>

      <DocSection
        id="input-password"
        title="InputPassword"
        description="Пароль с visibilityToggle. eyeIcon* кастомизирует кнопку. prefix/suffix на той же стороне скрывают toggle."
      >
        <DocRow label="с toggle">
          <InputPassword
            className="max-w-xs"
            label="Пароль"
            placeholder="••••••••"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="eyeIcon + стили">
          <InputPassword
            className="max-w-xs"
            placeholder="Кастомная кнопка"
            eyeIcon={<span className="text-[10px] font-bold">SHOW</span>}
            eyeIconHidden={<span className="text-[10px] font-bold">HIDE</span>}
            eyeIconClassName="rounded-md px-1"
            eyeIconColor="#3e5c4f"
            eyeIconBgColor="#f1efe8"
            eyeIconBorderWidth="1px"
            eyeIconBorderStyle="solid"
            eyeIconBorderColor="#d5d0c4"
            eyeIconBorderRadius="6px"
            eyeIconSize="lg"
          />
        </DocRow>
        <DocDivider />
        <DocRow label='eyeIconPosition="left"'>
          <InputPassword
            className="max-w-xs"
            eyeIconPosition="left"
            placeholder="Иконка слева"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="visibilityToggle={false}">
          <InputPassword
            className="max-w-xs"
            visibilityToggle={false}
            placeholder="Без кнопки"
          />
        </DocRow>
        <DocDivider />
        <DocRow label="allowClear + toggle">
          <InputPasswordClearDemo />
        </DocRow>
      </DocSection>

      <DocSection
        id="input-number"
        title="InputNumber"
        description="Числовое поле: value/onChange как number | null. Кастомные стрелки вместо нативных, min/max/step."
      >
        <DocRow label="controlled">
          <InputNumberDemo />
        </DocRow>
      </DocSection>

      <DocSection id="size" title="Size" description="Проп size: sm, md, lg.">
        <div className="flex max-w-xs flex-col gap-3">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </DocSection>

      <DocSection
        id="border-type"
        title="Border type"
        description="Проп borderType."
      >
        <div className="flex max-w-xs flex-col gap-3">
          <Input borderType="outline" placeholder="outline" />
          <Input borderType="filled" placeholder="filled" />
          <Input borderType="borderless" placeholder="borderless" />
        </div>
      </DocSection>

      <DocSection id="shape" title="Shape" description="Проп shape.">
        <div className="flex max-w-xs flex-col gap-3">
          <Input shape="round" placeholder="round" />
          <Input shape="default" placeholder="default" />
        </div>
      </DocSection>

      <DocSection
        id="disabled"
        title="Disabled"
        description="disabled блокирует ввод."
      >
        <DocRow>
          <Input className="max-w-xs" disabled placeholder="Недоступно" />
        </DocRow>
      </DocSection>

      <DocApiSection
        id="api"
        componentName="Input"
        note="Только text. Нет пропа type — используй InputPassword или InputNumber. allowClear требует controlled (value + onChange). suffix отключает allowClear."
      >
        <ApiTable rows={inputApiRows} />
      </DocApiSection>

      <DocApiSection
        id="api-password"
        componentName="InputPassword"
        note="Наследует пропы Input. HTML type задаётся внутри компонента."
      >
        <ApiTable rows={inputPasswordApiRows} />
      </DocApiSection>

      <DocApiSection
        id="api-number"
        componentName="InputNumber"
        note="value и onChange работают с number | null. Пустое поле → null. suffix отключает controls."
      >
        <ApiTable rows={inputNumberApiRows} />
      </DocApiSection>
    </>
  );
}
