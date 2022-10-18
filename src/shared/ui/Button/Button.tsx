import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string,
  theme?: string,
}

const Button: FC<ButtonProps> = (props) => {
  const { className, theme, children, ...otherProps } = props;

  return (
    <button
      className={classNames(cls.button, theme, className)}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
