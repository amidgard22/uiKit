import { cva } from 'class-variance-authority';

const sharedVariants = {
  variant: {
    default: 'text-text',
  },
  borderType: {
    outline: 'border border-border',
    borderless: 'border-none',
    filled: 'border-none bg-surface-muted',
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  shape: {
    default: 'rounded-none',
    round: 'rounded-md',
  },
  state: {
    default: '',
    error: 'border-danger',
    warning: 'border-warning',
  },
} as const;

export type InputVisualState = 'default' | 'error' | 'warning';

export function resolveInputState(
  hasError: boolean,
  status?: 'default' | 'error' | 'warning',
): InputVisualState {
  if (hasError || status === 'error') return 'error';
  if (status === 'warning') return 'warning';
  return 'default';
}

export const inputVariants = cva(
  [
    'w-full bg-surface text-text transition-colors',
    'placeholder:text-text-muted',
    'focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      ...sharedVariants,
      state: {
        default:
          'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0',
        error: 'border-danger focus-visible:border-danger focus-visible:ring-0',
        warning:
          'border-warning focus-visible:border-warning focus-visible:ring-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      borderType: 'outline',
      size: 'md',
      shape: 'round',
      state: 'default',
    },
  },
);

export const inputAffixWrapperVariants = cva(
  [
    'flex w-full items-center gap-2 bg-surface transition-colors',
    'focus-within:outline-none',
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
  ].join(' '),
  {
    variants: {
      ...sharedVariants,
      state: {
        default:
          'focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-0',
        error: 'border-danger focus-within:border-danger focus-within:ring-0',
        warning:
          'border-warning focus-within:border-warning focus-within:ring-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      borderType: 'outline',
      size: 'md',
      shape: 'round',
      state: 'default',
    },
  },
);

export const inputAffixFieldClass = [
  'min-w-0 flex-1 border-none bg-transparent p-0 shadow-none',
  'placeholder:text-text-muted',
  'focus-visible:outline-none focus-visible:ring-0',
  'disabled:cursor-not-allowed',
].join(' ');

export const inputIconSlotClass =
  'inline-flex size-[1em] shrink-0 items-center justify-center leading-none text-text-muted [&_svg]:size-[1em]';

export const inputPasswordNativeRevealHiddenClass = 'uikit-password-field';

export const inputNumberNativeSpinnerHiddenClass = 'uikit-number-field';

export const inputNumberControlsClass = [
  'flex flex-col self-stretch overflow-hidden border-l border-border/60 bg-surface-muted/60',
].join(' ');

export const inputNumberControlsSizeClass = {
  sm: 'w-6',
  md: 'w-7',
  lg: 'w-8',
} as const;

export const inputNumberControlButtonClass = [
  'flex flex-1 min-h-0 items-center justify-center',
  'text-text-muted transition-colors',
  'hover:bg-primary/10 hover:text-primary',
  'active:bg-primary/15',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-inset',
  'disabled:pointer-events-none disabled:opacity-25',
  '[&_svg]:size-2.5',
].join(' ');

export const inputNumberControlButtonDownClass = 'border-t border-border/60';

export const inputEyeIconSizeClass = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
} as const;

export const inputClearButtonClass = [
  inputIconSlotClass,
  'cursor-pointer rounded-sm text-text-subtle transition-colors',
  'hover:text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40',
].join(' ');
