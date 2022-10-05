import {useContext} from "react";
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';

interface useThemeResult {
  theme: Theme,
  changeTheme: () => void;
}

const useTheme = (): useThemeResult => {
  const {theme, setTheme} = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === Theme.Default ? Theme.Dark : Theme.Default;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }

  return {
    theme,
    changeTheme
  }
}

export default useTheme;
