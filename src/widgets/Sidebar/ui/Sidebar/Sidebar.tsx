import { FC } from 'react';
import classNames from 'classnames';
import ThemeSwitcher from "shared/ui/ThemeSwitcher/ThemeSwitcher";
import cls from './Sidebar.module.scss';
import LanguageSwitcher from "shared/ui/LanguageSwitcher/LanguageSwitcher";

interface SidebarProps {
  className?: string,
}

const Sidebar: FC<SidebarProps> = ({ className }) => {

  return (
    <aside className={classNames(cls.sidebar, className)}>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </aside>
  );
};

export default Sidebar;
