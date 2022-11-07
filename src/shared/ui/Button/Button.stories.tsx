import type { ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = {
  args: {
    children: 'Button',
  },
};

export const Disabled = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
