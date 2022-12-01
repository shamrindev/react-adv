import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/constants/themes';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18n from '@/shared/configs/i18n/i18nForTests';

interface RenderComponentOptions {
  theme?: Theme
  initialState?: DeepPartial<StateSchema>
}

interface TextProviderProps {
  children: ReactNode
  options?: RenderComponentOptions,
}

const TestProvider = ({ children, options }: TextProviderProps) => {
  const {
    theme = Theme.Light,
    initialState = {},
  } = options;

  return (
    <StoreProvider initialState={initialState}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider initState={theme}>
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};

export const renderComponent = (
  component: ReactNode,
  options: RenderComponentOptions = {},
) => render(<TestProvider options={options}>{component}</TestProvider>);
