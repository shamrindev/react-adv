import { FC } from 'react';
import classNames from 'classnames';
import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui';
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
