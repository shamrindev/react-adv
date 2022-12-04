import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';

type ButtonVariants = 'outline' | 'filled' | 'clear' | 'ghost';
type ButtonColors = 'primary' | 'secondary';
type ButtonSizes = 's' | 'm' | 'l' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string,
  variant?: ButtonVariants,
  size?: ButtonSizes,
  color?: ButtonColors,
  disabled?: boolean,
  square?: boolean,
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    variant = 'outline',
    size = 'm',
    color = 'primary',
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      className={classNames(cls.Button, className, mods, [
        cls[variant],
        cls[size],
        cls[color],
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
