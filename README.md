# @uikit/react

Учебный React UI Kit на TypeScript и Tailwind CSS. Проект задуман как **понятная база для своих компонентов**, а не как клон Ant Design: минимум магии, явная структура файлов, живая документация в playground.

Пакет публикуется как **`@uikit/react`** (имя `uikit` на npm занято другим проектом).

## Что внутри

- **Библиотека компонентов** — сборка через Vite в library mode, типы через `vite-plugin-dts`
- **Дизайн-токены** — палитра Sage Garden, единый источник в `src/tokens/colors.ts`
- **Утилиты** — `cn()` (clsx + tailwind-merge), CVA для вариантов стилей
- **Playground** — локальная документация в стиле Ant Design: сайдбар, примеры, таблицы API

### Компоненты

| Компонент | Статус | Основное |
|-----------|--------|----------|
| **Button** | готов | `variant`, `size`, `shape`, `borderType`, иконки, loading, link (`href`) |
| **Input** | готов | text-only: `label`, `errorMessage`, `status`, `prefix`/`suffix`, `allowClear` |
| **InputPassword** | готов | пароль + `visibilityToggle` |
| **InputNumber** | готов | `value`/`onChange` как `number \| null`, `min`/`max`/`step` |
| **Card** | в планах | — |

## Стек

- React 18 / 19
- TypeScript 5
- Tailwind CSS 3
- [class-variance-authority](https://cva.style/docs) (CVA)
- Vite 6

## Быстрый старт

```bash
git clone <repo-url>
cd uiKit
npm install
npm run dev
```

Playground откроется на [http://localhost:5173](http://localhost:5173). Там же смотри все варианты Button и Input.

### Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Playground в dev-режиме |
| `npm run build` | Сборка библиотеки в `dist/` |
| `npm run build:playground` | Сборка playground |
| `npm run typecheck` | Проверка TypeScript |
| `npm run format` | Prettier по всему проекту |

## Структура репозитория

```
uiKit/
├── src/                      # исходники библиотеки
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.variants.ts
│   │   │   └── index.ts
│   │   └── Input/
│   │       ├── Input.tsx           # text
│   │       ├── InputPassword.tsx
│   │       ├── InputNumber.tsx
│   │       ├── InputBase.tsx       # internal
│   │       ├── Input.types.ts
│   │       ├── Input.variants.ts
│   │       └── index.ts
│   ├── tokens/               # colors, spacing, borderRadius
│   ├── utils/cn.ts
│   ├── styles/globals.css
│   └── index.ts              # публичный API
├── playground/               # документация и демо (npm workspace)
│   └── src/docs/             # ButtonDoc, InputDoc, layout, API-таблицы
├── tailwind.preset.ts        # preset для потребителей пакета
├── vite.config.ts            # library mode
└── dist/                     # результат сборки (после npm run build)
```

### Паттерн компонента

Каждый компонент обычно состоит из четырёх частей:

1. **`*.variants.ts`** — стили через CVA (`variant`, `size`, …)
2. **`*.types.ts`** — пропсы, `Omit<>` для конфликтов с HTML (`size`, `prefix`, `type` у Button)
3. **`*.tsx`** — реализация, `forwardRef`
4. **`index.ts`** — barrel-экспорты

## Использование в своём проекте

### Локально (из этого репозитория)

```bash
npm run build
```

В другом проекте:

```bash
npm install /path/to/uiKit
```

```tsx
import { Button, Input, InputPassword, InputNumber, cn } from '@uikit/react';
import '@uikit/react/styles.css';
```

### Tailwind в потребителе

Подключи preset, чтобы совпали токены (`primary`, `surface`, `danger`, `warning`, …):

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import uikitPreset from '@uikit/react/tailwind.preset';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@uikit/react/dist/**/*.js',
  ],
  presets: [uikitPreset],
} satisfies Config;
```

## Публичный API

```ts
// Компоненты
export { Button, buttonVariants, buttonIconSlotClass } from './components/Button';
export { Input, InputPassword, InputNumber, inputVariants, ... } from './components/Input';

// Утилиты и токены
export { cn } from './utils/cn';
export { colors, borderRadius, spacing } from './tokens';
```

Типы: `ButtonProps`, `InputProps`, `InputPasswordProps`, `InputNumberProps`.

## Playground / документация

Playground — не Storybook, а свой лёгкий docs-сайт:

- **слева** — список компонентов
- **по центру** — примеры по секциям
- **справа** (на широких экранах) — якоря «На этой странице» + **API** внизу

Новый компонент в доке:

1. Страница в `playground/src/docs/*Doc.tsx`
2. Запись в `playground/src/docs/registry.ts`
3. Ветка в `playground/src/App.tsx`

## Дизайн-система

Тема **Sage Garden** — тёплый sage-зелёный primary, бумажный фон, терракотовый `danger`, янтарный `warning`.

Токены задаются в `src/tokens/colors.ts` и подхватываются в `tailwind.preset.ts`. Меняй палитру там — компоненты и playground подтянут цвета через Tailwind-классы (`bg-primary`, `text-danger`, …).

## Принципы проекта

- **Малый scope** — один PR = один компонент или одна фича
- **Без лишней абстракции** — пропсы близки к HTML, кастомное поверх
- **Конфликты имён** — явный `Omit` и отдельные пропы (`htmlType` у Button, `borderType` вместо HTML `type`)
- **Доступность** — `label` + `htmlFor`, `aria-invalid`, `aria-describedby` где уже реализовано

## Дорожная карта

- [ ] Card (составной: Header, Body, Footer)
- [ ] Modal
- [ ] Table
- [ ] Input.number etc.
- [ ] Slider
## Лицензия

Уточни лицензию перед публикацией на npm. Пока проект учебный / в разработке.
