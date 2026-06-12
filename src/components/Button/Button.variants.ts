import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        ghost: 'bg-transparent text-text hover:bg-surface-muted',
        danger: 'bg-danger text-danger-foreground hover:bg-danger-hover',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-sm',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-md',
      },
      shape: {
        default: 'rounded-none',
        circle: 'rounded-full',
        round: 'rounded-md',
      },
      borderType: {
        outline: 'border border-border',
        dashed: 'border border-dashed border-border',
        solid: 'border border-solid border-border',
        filled: 'border-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'default',
      borderType: 'filled',
    },
  },
);

/**
 * Иконка/спиннер в 1em — масштабируется с font-size кнопки (как в Ant Design).
 * size="lg" → text-base, className="text-lg" → иконка крупнее.
 */
export const buttonIconSlotClass =
  'inline-flex size-[1em] shrink-0 items-center justify-center leading-none [&_svg]:size-[1em]';
