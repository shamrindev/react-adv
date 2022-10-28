import React, {
  FC, ReactNode, useMemo, useState,
} from 'react';
import { Theme, LOCAL_STORAGE_THEME_KEY, ThemeContext } from '../lib/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode,
  initState?: Theme
}

const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
const defaultTheme = window.matchMedia && (
  window.matchMedia('(prefers-color-scheme: dark)') ? Theme.Dark : Theme.Light);

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initState }) => {
  const [theme, setTheme] = useState<Theme>(initState || savedTheme || defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
