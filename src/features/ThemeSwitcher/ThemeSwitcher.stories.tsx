import type { ComponentMeta } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
} as ComponentMeta<typeof ThemeSwitcher>;

export const Small = {
  args: {
    size: 's',
  },
};
