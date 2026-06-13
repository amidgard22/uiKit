import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { cardVariants } from './Card.variants';

export interface CardProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
  // Заголовок
  title?: ReactNode;
  // Дополнительный контент в правом верхнем углу
  extra?: ReactNode;
  // Обложка
  cover?: ReactNode;
  // Действия (кнопки внизу карточки)
  actions?: ReactNode[];
  // Лёгкий подъём и тень при наведении
  hoverable?: boolean;
  // Скелетон вместо содержимого body
  loading?: boolean;
}
