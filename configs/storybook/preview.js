import { addDecorator } from '@storybook/react';
import { styleDecorator } from '../../src/shared/configs/storybook/styleDecorator';
import { routerDecorator } from '../../src/shared/configs/storybook/routerDecorator';
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

addDecorator(styleDecorator);
addDecorator(routerDecorator);
