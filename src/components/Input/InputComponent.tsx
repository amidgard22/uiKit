import { forwardRef, useId, type ChangeEvent, type MouseEvent } from 'react';

import { cn } from '../../utils/cn';
import {
  inputAffixFieldClass,
  inputAffixWrapperVariants,
  inputClearButtonClass,
  inputIconSlotClass,
  inputVariants,
  resolveInputState,
} from './Input.variants';

import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      variant,
      size,
      shape,
      borderType,
      disabled,
      label,
      labelClassName,
      errorMessage,
      errorMessageClassName,
      status,
      prefix,
      suffix,
      allowClear,
      onClear,
      inputClassName,
      value,
      onChange,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const randomId = useId();
    const inputId = id ?? randomId;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(errorMessage) || status === 'error';
    const inputState = resolveInputState(hasError, status);
    const hasValue =
      value !== undefined && value !== null && String(value).length > 0;
    const showClear =
      allowClear && !disabled && !readOnly && !suffix && hasValue;
    const hasAffix = Boolean(prefix || suffix || allowClear);
    const variantProps = {
      variant,
      size,
      shape,
      borderType,
      state: inputState,
    };

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onChange?.({
        target: { value: '' },
      } as unknown as ChangeEvent<HTMLInputElement>);
      onClear?.();
    };

    const inputElement = (
      <input
        ref={ref}
        id={inputId}
        className={cn(
          hasAffix ? inputAffixFieldClass : inputVariants(variantProps),
          inputClassName,
        )}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        aria-invalid={hasError || undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        {...props}
      />
    );

    return (
      <div className={cn('flex w-full flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-text',
              disabled && 'cursor-not-allowed opacity-50',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        {hasAffix ? (
          <div className={cn(inputAffixWrapperVariants(variantProps))}>
            {prefix && (
              <span className={inputIconSlotClass} aria-hidden="true">
                {prefix}
              </span>
            )}
            {inputElement}
            {suffix && (
              <span className={inputIconSlotClass} aria-hidden="true">
                {suffix}
              </span>
            )}
            {showClear && (
              <button
                type="button"
                tabIndex={-1}
                aria-label="Очистить"
                className={inputClearButtonClass}
                onClick={handleClear}
              >
                x
              </button>
            )}
          </div>
        ) : (
          inputElement
        )}
        {errorMessage && (
          <p
            id={errorId}
            className={cn('text-[13px] text-danger', errorMessageClassName)}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
