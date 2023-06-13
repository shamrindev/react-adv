import { FC, memo } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { ButtonProps, ButtonSize, ButtonTheme } from '../Button.types'

import cls from './Button.module.scss'

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    size = ButtonSize.M,
    fullWidth,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  }

  return (
    <button
      className={classNames(cls.button, mods, [className, cls[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
