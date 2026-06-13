import {
  forwardRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type SVGProps,
} from 'react';

import { cn } from '../../utils/cn';
import {
  inputNumberControlButtonClass,
  inputNumberControlButtonDownClass,
  inputNumberControlsClass,
  inputNumberControlsSizeClass,
  inputNumberNativeSpinnerHiddenClass,
} from './Input.variants';
import { InputBase } from './InputBase';

import type { InputNumberProps } from './Input.types';

function ChevronUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.25 7.25L6 4.5L8.75 7.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.25 4.75L6 7.5L8.75 4.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatNumberValue(
  value: number | null | undefined,
): string | undefined {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

function parseNumberValue(raw: string): number | null {
  if (raw === '') {
    return null;
  }

  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function clampNumber(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

function getStepBase(current: number | null, min?: number): number {
  return current ?? min ?? 0;
}

function stepNumber(
  current: number | null,
  direction: 1 | -1,
  step = 1,
  min?: number,
  max?: number,
): number {
  const base = getStepBase(current, min);
  return clampNumber(base + direction * step, min, max);
}

function canIncrementValue(
  current: number | null,
  min?: number,
  max?: number,
): boolean {
  const base = getStepBase(current, min);
  return max === undefined || base < max;
}

function canDecrementValue(
  current: number | null,
  min?: number,
): boolean {
  const base = getStepBase(current, min);
  return min === undefined || base > min;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step,
      controls = true,
      upIcon,
      downIcon,
      controlsClassName,
      suffix,
      disabled,
      size = 'md',
      shape = 'round',
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(
      defaultValue ?? null,
    );
    const currentValue = isControlled ? value : uncontrolledValue;
    const stepAmount = step ?? 1;

    const emitChange = (next: number | null) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = parseNumberValue(event.target.value);
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    };

    const handleStep = (direction: 1 | -1) => (event: MouseEvent) => {
      event.preventDefault();
      const next = stepNumber(
        currentValue ?? null,
        direction,
        stepAmount,
        min,
        max,
      );
      emitChange(next);
    };

    const showControls = controls && !suffix;
    const canIncrement =
      !disabled && canIncrementValue(currentValue ?? null, min, max);
    const canDecrement =
      !disabled && canDecrementValue(currentValue ?? null, min);
    const controlSize = size ?? 'md';

    const trailingSlot = showControls ? (
      <div
        className={cn(
          inputNumberControlsClass,
          inputNumberControlsSizeClass[controlSize],
          shape === 'round' && 'rounded-r-md',
          controlsClassName,
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Увеличить"
          disabled={!canIncrement}
          className={inputNumberControlButtonClass}
          onMouseDown={handleStep(1)}
        >
          {upIcon ?? <ChevronUpIcon />}
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Уменьшить"
          disabled={!canDecrement}
          className={cn(
            inputNumberControlButtonClass,
            inputNumberControlButtonDownClass,
          )}
          onMouseDown={handleStep(-1)}
        >
          {downIcon ?? <ChevronDownIcon />}
        </button>
      </div>
    ) : undefined;

    return (
      <InputBase
        ref={ref}
        inputType="number"
        value={value !== undefined ? formatNumberValue(value) : undefined}
        defaultValue={
          defaultValue !== undefined ? String(defaultValue) : undefined
        }
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        suffix={suffix}
        disabled={disabled}
        size={size}
        shape={shape}
        trailingSlot={trailingSlot}
        flushTrailing={showControls}
        inputClassName={cn(
          inputNumberNativeSpinnerHiddenClass,
          inputClassName,
        )}
        {...props}
      />
    );
  },
);

InputNumber.displayName = 'InputNumber';
