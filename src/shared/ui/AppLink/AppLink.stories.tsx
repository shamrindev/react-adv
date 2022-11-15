import type { ComponentMeta } from '@storybook/react';
import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
} as ComponentMeta<typeof AppLink>;

export const Primary = {
  args: {
    children: 'Link',
  },
};
