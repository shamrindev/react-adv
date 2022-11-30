import type { ComponentMeta } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'shared/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;
export default meta;

export const Primary = {
  args: {
    container: document.getElementById('root'),
    children: 'Modal',
    isOpen: true,
  },
};
