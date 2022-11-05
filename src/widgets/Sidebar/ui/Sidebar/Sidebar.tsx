import { FC } from 'react';
import classNames from 'classnames';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

export const Sidebar: FC<SidebarProps> = ({ className }) => (
  <aside className={classNames(cls.sidebar, className)}>
    <ThemeSwitcher />
    <LanguageSwitcher />
  </aside>
);
