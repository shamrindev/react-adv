import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/configs/storybook/StyleDecorator';
import { RouterDecorator } from '../../src/shared/configs/storybook/RouterDecorator';
import { ThemeDecorator } from '../../src/shared/configs/storybook/ThemeDecorator';
import { Theme } from '../../src/shared/constants/themes';
import './i18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light-theme', color: '#fff' },
      { name: 'dark', class: 'dark-theme', color: '#141414' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(ThemeDecorator(Theme.Light));
