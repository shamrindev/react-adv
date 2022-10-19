import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RoutesPaths } from 'shared/constants/routes';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

const Navbar: FC<NavbarProps> = ({ className }) => (
  <nav className={classNames(cls.navbar, className)}>
    <Link className={classNames(cls.link)} to={RoutesPaths.MAIN}>Главная</Link>
    <Link className={classNames(cls.link)} to={RoutesPaths.ABOUT}>О компании</Link>
  </nav>
);

export default Navbar;
