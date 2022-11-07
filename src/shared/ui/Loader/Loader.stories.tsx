import type { ComponentMeta } from '@storybook/react';

import { Loader } from './Loader';

export default {
  title: 'shared/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Small = {
  args: {
    size: 's',
  },
};

export const Medium = {
  args: {
    size: 'm',
  },
};

export const Large = {
  args: {
    size: 'l',
  },
};
