import React, { FC, ReactNode, useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from '../lib/ThemeContext'

// only LIGHT/DARK are valid; coerce any stale value (e.g. a previously stored
// legacy theme class) back to the default. Dark is the default so the first
// impression matches the Reddit-style dark reference; light stays a click away
// via the theme switcher.
const storedTheme = localStorage.getItem(
  LOCAL_STORAGE_THEME_KEY
) as Theme | null
const defaultTheme =
  storedTheme === Theme.DARK || storedTheme === Theme.LIGHT
    ? storedTheme
    : Theme.DARK

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
