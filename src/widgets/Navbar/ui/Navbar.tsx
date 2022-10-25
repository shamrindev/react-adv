import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'shared/constants/routes';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames(cls.navbar, className)}>
      <Link className={classNames(cls.link)} to={RoutesPaths.MAIN}>{t('Главная')}</Link>
      <Link className={classNames(cls.link)} to={RoutesPaths.ABOUT}>{t('О нас')}</Link>
    </nav>
  );
};

export default Navbar;
