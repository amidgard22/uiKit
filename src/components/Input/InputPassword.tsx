import { forwardRef, useState, type CSSProperties } from 'react';

import { cn } from '../../utils/cn';
import { inputClearButtonClass, inputEyeIconSizeClass, inputPasswordNativeRevealHiddenClass } from './Input.variants';
import { InputBase } from './InputBase';

import type { InputPasswordProps } from './Input.types';

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      visibilityToggle = true,
      eyeIcon,
      eyeIconHidden,
      eyeIconClassName,
      eyeIconPosition = 'right',
      eyeIconSize = 'md',
      eyeIconColor,
      eyeIconBgColor,
      eyeIconBorderColor,
      eyeIconBorderRadius,
      eyeIconBorderWidth,
      eyeIconBorderStyle,
      prefix,
      suffix,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    const hasCustomAffix =
      eyeIconPosition === 'left' ? Boolean(prefix) : Boolean(suffix);

    const eyeToggleButton =
      visibilityToggle && !hasCustomAffix ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
          className={cn(
            inputClearButtonClass,
            inputEyeIconSizeClass[eyeIconSize],
            eyeIconClassName,
          )}
          style={
            {
              color: eyeIconColor,
              backgroundColor: eyeIconBgColor,
              borderColor: eyeIconBorderColor,
              borderRadius: eyeIconBorderRadius,
              borderWidth: eyeIconBorderWidth,
              borderStyle: eyeIconBorderStyle,
            } satisfies CSSProperties
          }
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? (eyeIconHidden ?? '🙈') : (eyeIcon ?? '👁')}
        </button>
      ) : undefined;

    const leadingSlot =
      eyeIconPosition === 'left' ? eyeToggleButton : undefined;
    const trailingSlot =
      eyeIconPosition === 'right' ? eyeToggleButton : undefined;

    return (
      <InputBase
        ref={ref}
        inputType={visible ? 'text' : 'password'}
        prefix={prefix}
        suffix={suffix}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
        inputClassName={cn(
          inputPasswordNativeRevealHiddenClass,
          inputClassName,
        )}
        {...props}
      />
    );
  },
);

InputPassword.displayName = 'InputPassword';
