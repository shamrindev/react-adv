import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Theme } from '@/shared/constants/themes';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18n from '@/shared/configs/i18n/i18nForTests';

interface RenderComponentOptions {
  theme?: Theme
}

interface TextProviderProps {
  children: ReactNode
  options?: RenderComponentOptions,
}

const TestProvider = ({ children, options }: TextProviderProps) => {
  const {
    theme = Theme.Light,
  } = options;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider initState={theme}>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
};

export const renderComponent = (
  component: ReactNode,
  options: RenderComponentOptions = {},
) => render(<TestProvider options={options}>{component}</TestProvider>);
