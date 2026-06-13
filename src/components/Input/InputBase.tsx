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

import type { InputBaseProps } from './Input.types';

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
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
      leadingSlot,
      trailingSlot,
      flushTrailing,
      allowClear,
      onClear,
      inputClassName,
      inputType,
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
    const hasAffix = Boolean(
      prefix || suffix || leadingSlot || trailingSlot || allowClear,
    );
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
        type={inputType}
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
          <div
            className={cn(
              inputAffixWrapperVariants(variantProps),
              flushTrailing && 'gap-1 overflow-hidden pr-0',
            )}
          >
            {prefix && (
              <span className={inputIconSlotClass} aria-hidden="true">
                {prefix}
              </span>
            )}
            {leadingSlot}
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
                ✕
              </button>
            )}
            {trailingSlot}
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

InputBase.displayName = 'InputBase';
