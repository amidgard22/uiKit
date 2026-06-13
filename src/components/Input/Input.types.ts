import type { InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from './Input.variants';

export type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'type'
> &
  Omit<VariantProps<typeof inputVariants>, 'state'> & {
    label?: string;
    labelClassName?: string;
    errorMessage?: string;
    errorMessageClassName?: string;
    status?: 'default' | 'error' | 'warning';
    prefix?: ReactNode;
    suffix?: ReactNode;
    allowClear?: boolean;
    onClear?: () => void;
    inputClassName?: string;
  };

export interface InputProps extends BaseInputProps {}

export interface InputPasswordProps extends BaseInputProps {
  visibilityToggle?: boolean;
  eyeIcon?: ReactNode;
  eyeIconHidden?: ReactNode;
  eyeIconClassName?: string;
  eyeIconPosition?: 'left' | 'right';
  eyeIconSize?: 'sm' | 'md' | 'lg';
  eyeIconColor?: string;
  eyeIconBgColor?: string;
  eyeIconBorderColor?: string;
  eyeIconBorderRadius?: string;
  eyeIconBorderWidth?: string;
  eyeIconBorderStyle?: string;
}

export interface InputNumberProps extends Omit<
  BaseInputProps,
  'value' | 'defaultValue' | 'onChange' | 'allowClear' | 'onClear'
> {
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Кастомные стрелки вместо нативных (по умолчанию true). Скрываются при suffix */
  controls?: boolean;
  upIcon?: ReactNode;
  downIcon?: ReactNode;
  controlsClassName?: string;
}

export interface InputBaseProps extends BaseInputProps {
  inputType: 'text' | 'password' | 'number';
  /** Интерактивный слот слева внутри affix (не aria-hidden) */
  leadingSlot?: ReactNode;
  /** Интерактивный слот справа внутри affix (toggle, не блокирует allowClear) */
  trailingSlot?: ReactNode;
  /** Убрать правый padding у affix — слот прижат к краю (InputNumber controls) */
  flushTrailing?: boolean;
}
