import React, {
  FC, ReactNode, useMemo, useState,
} from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme, getTheme } from '@/shared/constants/themes';

interface ThemeProviderProps {
  children: ReactNode,
  initState?: Theme
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initState }) => {
  const [theme, setTheme] = useState<Theme>(initState || getTheme());

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
