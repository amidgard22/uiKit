import { forwardRef } from 'react';

import { InputBase } from './InputBase';

import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputBase ref={ref} inputType="text" {...props} />
));

Input.displayName = 'Input';
