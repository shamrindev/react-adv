import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames(cls.navbar, className)} />
  );
};
