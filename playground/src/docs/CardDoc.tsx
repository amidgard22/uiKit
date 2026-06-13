import { Button, Card } from '@uikit/react';
import { ApiTable, type ApiTableRow } from './ApiTable';
import {
  DocApiSection,
  DocHeader,
  DocRow,
  DocSection,
} from './DocPrimitives';

const cardApiRows: ApiTableRow[] = [
  {
    property: 'title',
    description: 'Заголовок карточки',
    type: 'ReactNode',
  },
  {
    property: 'extra',
    description: 'Контент в правом верхнем углу шапки',
    type: 'ReactNode',
  },
  {
    property: 'cover',
    description: 'Обложка сверху (картинка или любой ReactNode)',
    type: 'ReactNode',
  },
  {
    property: 'actions',
    description: 'Список действий внизу карточки',
    type: 'ReactNode[]',
  },
  {
    property: 'variant',
    description: 'Вариант оформления',
    type: `'outlined' | 'borderless'`,
    default: 'outlined',
  },
  {
    property: 'size',
    description: 'Размер отступов',
    type: `'sm' | 'md'`,
    default: 'md',
  },
  {
    property: 'hoverable',
    description: 'Лёгкий подъём и тень при наведении',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'loading',
    description: 'Скелетон вместо содержимого body',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Дополнительные CSS-классы корня',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Тело карточки',
    type: 'ReactNode',
  },
];

export function CardDoc() {
  return (
    <>
      <DocHeader
        title="Card"
        description="Контейнер с заголовком, обложкой, телом и действиями. Базовый блок для контента и списков."
      />

      <DocSection
        id="basic"
        title="Basic"
        description="title + children — самый частый кейс."
      >
        <Card className="max-w-sm" title="Sage Garden">
          Минималистичная палитра для uiKit: тёплые нейтрали и приглушённый
          зелёный primary.
        </Card>
      </DocSection>

      <DocSection
        id="extra"
        title="Extra"
        description="extra — слот справа в шапке, рядом с title."
      >
        <Card
          className="max-w-sm"
          title="Проект"
          extra={<a href="#">Подробнее</a>}
        >
          Карточка с ссылкой или кнопкой в шапке.
        </Card>
      </DocSection>

      <DocSection
        id="cover"
        title="Cover"
        description="cover рендерится над шапкой, на всю ширину."
      >
        <Card
          className="max-w-sm"
          cover={
            <img
              alt="Пейзаж"
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&h=360&fit=crop"
            />
          }
          title="Обложка"
        >
          Изображение без внутренних отступов — удобно для превью.
        </Card>
      </DocSection>

      <DocSection
        id="actions"
        title="Actions"
        description="actions — массив элементов внизу, с разделителем."
      >
        <Card
          className="max-w-sm"
          title="Действия"
          actions={[
            <Button key="edit" variant="ghost" size="sm">
              Изменить
            </Button>,
            <Button key="save" size="sm">
              Сохранить
            </Button>,
          ]}
        >
          Кнопки или ссылки в нижней панели.
        </Card>
      </DocSection>

      <DocSection
        id="variant"
        title="Variant"
        description="outlined — с обводкой, borderless — без рамки и тени."
      >
        <div className="flex flex-wrap gap-4">
          <Card className="max-w-xs" variant="outlined" title="outlined">
            С рамкой
          </Card>
          <Card className="max-w-xs" variant="borderless" title="borderless">
            Без рамки
          </Card>
        </div>
      </DocSection>

      <DocSection id="size" title="Size" description="sm и md — разные отступы.">
        <div className="flex flex-wrap gap-4">
          <Card className="max-w-xs" size="sm" title="Small">
            Компактные отступы
          </Card>
          <Card className="max-w-xs" size="md" title="Medium">
            Стандартные отступы
          </Card>
        </div>
      </DocSection>

      <DocSection
        id="hoverable"
        title="Hoverable"
        description="hoverable — лёгкий подъём и тень при наведении."
      >
        <Card className="max-w-sm" hoverable title="Наведи курсор">
          Подходит для кликабельных карточек и списков.
        </Card>
      </DocSection>

      <DocSection
        id="loading"
        title="Loading"
        description="loading заменяет children скелетоном. title и cover остаются."
      >
        <DocRow label="loading">
          <Card className="max-w-sm" loading title="Загрузка">
            Этот текст не виден во время loading.
          </Card>
        </DocRow>
      </DocSection>

      <DocApiSection id="api" componentName="Card">
        <ApiTable rows={cardApiRows} />
      </DocApiSection>
    </>
  );
}
