import { FC } from 'react';
import classNames from 'classnames';
import { Theme, useTheme } from 'app/providers/theme';
import { Button } from 'shared/ui';
import SunIcon from 'shared/assets/icons/sun.svg';
import MoonIcon from 'shared/assets/icons/moon.svg';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string,
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, changeTheme } = useTheme();

  const getIcon = () => {
    if (theme === Theme.Light) {
      return <MoonIcon />
    }
    return <SunIcon />
  }

  return (
    <Button className={classNames(cls.button, className)} onClick={changeTheme}>
      {getIcon()}
    </Button>
  );
};

export default ThemeSwitcher;
