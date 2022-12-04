import { LOCAL_STORAGE_THEME_KEY } from './localstorage';

export enum Theme {
  Light = 'light-theme',
  Dark = 'dark-theme'
}

export const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
export const defaultTheme = window.matchMedia && (
  window.matchMedia('(prefers-color-scheme: dark)') ? Theme.Dark : Theme.Light);

export const getTheme = (): Theme => savedTheme || defaultTheme;
