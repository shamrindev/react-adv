import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/constants/localstorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { getTheme, Theme } from '@/shared/constants/themes';

interface UseThemeResult {
  theme: Theme,
  changeTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  useEffect(() => {
    const bodyClasses = window.document.body.classList;
    bodyClasses.remove(Theme.Light, Theme.Dark);
    bodyClasses.add(theme || getTheme());
  }, [theme]);

  return {
    theme: theme || getTheme(),
    changeTheme,
  };
};
