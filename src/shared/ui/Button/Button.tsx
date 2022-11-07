import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';

type ButtonVariants = 'outline' | 'filled' | 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string,
  variant?: ButtonVariants,
  disabled?: boolean,
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    variant,
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
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
