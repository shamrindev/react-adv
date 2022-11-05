import React, {
  FC, ReactNode, useMemo, useState,
} from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/constants/localstorage';
import { Theme } from '@/shared/constants/themes';

interface ThemeProviderProps {
  children: ReactNode,
  initState?: Theme
}

const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
const defaultTheme = window.matchMedia && (
  window.matchMedia('(prefers-color-scheme: dark)') ? Theme.Dark : Theme.Light);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initState }) => {
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
