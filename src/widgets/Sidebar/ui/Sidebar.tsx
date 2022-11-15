import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from '@/shared/constants/routes';
import { AppLink } from '@/shared/ui/AppLink';
import { IconHome, IconInfo } from '@/shared/assets/icons';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Button } from '@/shared/ui/Button';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(cls.Sidebar, className, { [cls.collapsed]: collapsed })}
      data-testid="sidebar"
    >
      <div className={cls.items}>
        <AppLink
          className={cls.item}
          to={RoutesPaths.MAIN}
          activeClassName={cls.active}
        >
          <IconHome className={cls.icon} />
          <span className={cls.link}>{t('Главная')}</span>
        </AppLink>
        <AppLink
          className={cls.item}
          to={RoutesPaths.ABOUT}
          activeClassName={cls.active}
        >
          <IconInfo className={cls.icon} />
          <span className={cls.link}>{t('О нас')}</span>
        </AppLink>
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher className={cls.item} />
        <LanguageSwitcher
          className={classNames(cls.lang, cls.item)}
          short={collapsed}
        />
      </div>

      <Button
        className={cls.collapseBtn}
        onClick={onToggle}
        size="icon"
        color="secondary"
        data-testid="sidebar-toggle"
      >
        {collapsed ? '>' : '<'}
      </Button>
    </div>
  );
};
