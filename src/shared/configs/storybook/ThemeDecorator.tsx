import { Story } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/constants/themes';

export const ThemeDecorator = (theme: Theme) => (Story: Story) => (
  <ThemeProvider initState={theme}>
    <Story />
  </ThemeProvider>
);
