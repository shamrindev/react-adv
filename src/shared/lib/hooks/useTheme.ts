import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/constants/localstorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/constants/themes';

interface UseThemeResult {
  theme: Theme,
  changeTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme,
    changeTheme,
  };
};
