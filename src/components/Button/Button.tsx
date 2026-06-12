import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { buttonIconSlotClass, buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      shape,
      borderType,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      htmlType = 'button',
      loadingIcon,
      href,
      ...props
    },
    ref,
  ) => {
    const isLink = Boolean(href);
    const isDisabled = disabled || loading;

    const classes = cn(
      buttonVariants({ variant, size, shape, borderType }),
      className,
    );

    const content = (
      <>
        {!loading && leftIcon && (
          <span className={buttonIconSlotClass}>{leftIcon}</span>
        )}
        {loading &&
          (loadingIcon ? (
            <span className={buttonIconSlotClass} aria-hidden="true">
              {loadingIcon}
            </span>
          ) : (
            <span
              className={cn(
                buttonIconSlotClass,
                'animate-spin rounded-full border-2 border-current border-t-transparent',
              )}
              aria-hidden="true"
            />
          ))}
        {loading ? (loadingText ?? children) : children}
        {!loading && rightIcon && (
          <span className={buttonIconSlotClass}>{rightIcon}</span>
        )}
      </>
    );

    if (isLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : undefined}
          className={cn(
            classes,
            'no-underline',
            isDisabled && 'pointer-events-none opacity-50',
          )}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        className={classes}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
