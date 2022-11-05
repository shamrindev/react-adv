import { createContext } from 'react';
import { Theme } from '@/shared/constants/themes';

interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
