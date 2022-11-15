import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from '@/shared/constants/routes';
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
