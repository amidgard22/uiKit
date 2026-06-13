import { forwardRef } from 'react';

import { cn } from '../../utils/cn';
import {
  cardActionItemClass,
  cardActionsClass,
  cardBodyClass,
  cardCoverClass,
  cardExtraClass,
  cardHeadClass,
  cardLoadingClass,
  cardLoadingLineClass,
  cardSizeClass,
  cardTitleClass,
  cardVariants,
} from './Card.variants';

import type { CardProps } from './Card.types';

function CardLoadingSkeleton() {
  return (
    <div className={cardLoadingClass} aria-hidden="true">
      <div className={cn(cardLoadingLineClass, 'w-2/3')} />
      <div className={cn(cardLoadingLineClass, 'w-full')} />
      <div className={cn(cardLoadingLineClass, 'w-4/5')} />
    </div>
  );
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      hoverable,
      title,
      extra,
      cover,
      actions,
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const cardSize = size ?? 'md';
    const sizeClass = cardSizeClass[cardSize];
    const hasHead = Boolean(title || extra);
    const hasBody = Boolean(children) || loading;
    const hasActions = Boolean(actions?.length);

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, hoverable }), className)}
        aria-busy={loading || undefined}
        {...props}
      >
        {cover && <div className={cardCoverClass}>{cover}</div>}

        {hasHead && (
          <div className={cn(cardHeadClass, sizeClass.head)}>
            {title && <div className={cardTitleClass}>{title}</div>}
            {extra && <div className={cardExtraClass}>{extra}</div>}
          </div>
        )}

        {hasBody && (
          <div
            className={cn(
              cardBodyClass,
              hasHead ? sizeClass.bodyWithHead : sizeClass.body,
            )}
          >
            {loading ? <CardLoadingSkeleton /> : children}
          </div>
        )}

        {hasActions && (
          <div className={cn(cardActionsClass, sizeClass.actions)}>
            {actions?.map((action, index) => (
              <div key={index} className={cardActionItemClass}>
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Card.displayName = 'Card';
