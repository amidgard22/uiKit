import type { InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from './Input.variants';

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    Omit<VariantProps<typeof inputVariants>, 'state'> {
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
}
