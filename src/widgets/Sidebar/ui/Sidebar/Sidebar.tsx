import { FC } from 'react';
import classNames from 'classnames';
import ThemeSwitcher from "shared/ui/ThemeSwitcher/ThemeSwitcher";
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

const Sidebar: FC<SidebarProps> = ({ className }) => {

  return (
    <aside className={classNames(cls.sidebar, className)}>
      <ThemeSwitcher />
    </aside>
  );
};

export default Sidebar;
