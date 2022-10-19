import { FC } from 'react';
import classNames from 'classnames';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from 'shared/ui/LanguageSwitcher/LanguageSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

const Sidebar: FC<SidebarProps> = ({ className }) => (
  <aside className={classNames(cls.sidebar, className)}>
    <ThemeSwitcher />
    <LanguageSwitcher />
  </aside>
);

export default Sidebar;
