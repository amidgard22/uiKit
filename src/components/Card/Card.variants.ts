import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  [
    'overflow-hidden rounded-lg bg-surface-elevated text-text',
    'transition-[box-shadow,transform] duration-200',
  ].join(' '),
  {
    variants: {
      variant: {
        outlined: 'border border-border shadow-sm',
        borderless: 'border border-transparent shadow-none',
      },
      size: {
        sm: '',
        md: '',
      },
      hoverable: {
        true: 'hover:-translate-y-px hover:shadow-md',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      hoverable: false,
    },
  },
);

export const cardCoverClass =
  'overflow-hidden [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:object-cover';

export const cardHeadClass =
  'flex items-start justify-between gap-3 border-b border-transparent';

export const cardTitleClass = 'min-w-0 flex-1 text-base font-semibold text-text';

export const cardExtraClass = 'shrink-0 text-sm text-text-muted';

export const cardBodyClass = 'text-sm text-text';

export const cardActionsClass =
  'flex flex-wrap items-center gap-2 border-t border-border bg-surface-muted/40';

export const cardActionItemClass = 'inline-flex items-center';

export const cardLoadingClass = 'space-y-3';

export const cardLoadingLineClass =
  'h-3 animate-pulse rounded-sm bg-surface-muted';

export const cardSizeClass = {
  sm: {
    head: 'px-3 pt-3',
    body: 'px-3 py-3',
    bodyWithHead: 'px-3 pb-3 pt-2',
    actions: 'px-3 py-2',
  },
  md: {
    head: 'px-5 pt-5',
    body: 'px-5 py-5',
    bodyWithHead: 'px-5 pb-5 pt-3',
    actions: 'px-5 py-3',
  },
} as const;
