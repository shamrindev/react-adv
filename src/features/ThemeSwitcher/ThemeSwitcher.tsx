import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/constants/themes';
import { Button } from '@/shared/ui/Button';
import SunIcon from '@/shared/assets/icons/IconSun.svg';
import MoonIcon from '@/shared/assets/icons/IconMoon.svg';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string,
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { t } = useTranslation();
  const { theme, changeTheme } = useTheme();

  const getIcon = () => {
    if (theme === Theme.Light) {
      return <MoonIcon />;
    }
    return <SunIcon />;
  };

  const getTitle = () => {
    if (theme === Theme.Light) {
      return t('Переключить на темную тему');
    }
    return t('Переключить на светлую тему');
  };

  return (
    <Button
      className={classNames(cls.button, className)}
      onClick={changeTheme}
      variant="clear"
      title={getTitle()}
      data-testid="ThemeSwitcher"
      data-testval={theme}
    >
      {getIcon()}
    </Button>
  );
};
