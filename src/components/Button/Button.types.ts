import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './Button.variants';

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Указатель загрузки
  loading?: boolean;
  // Текст загрузки
  loadingText?: string;
  // Иконка загрузки
  loadingIcon?: ReactNode;
  // Иконка слева
  leftIcon?: ReactNode;
  // Иконка справа
  rightIcon?: ReactNode;
  // Тип кнопки
  htmlType?: 'button' | 'submit' | 'reset';
  // Ссылка
  href?: string;
  // Цель ссылки
  target?: string;
  // Связь ссылки
  rel?: string;
}
