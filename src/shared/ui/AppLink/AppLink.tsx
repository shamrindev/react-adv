import { FC } from 'react';
import classNames from 'classnames';
import { LinkProps, NavLink } from 'react-router-dom';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
  className?: string,
  activeClassName?: string
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    className,
    children,
    activeClassName = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(cls.AppLink, className, {
        [activeClassName]: isActive,
      })}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
};
