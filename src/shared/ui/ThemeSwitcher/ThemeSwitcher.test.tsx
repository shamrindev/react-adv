import { fireEvent, screen } from '@testing-library/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { renderComponent } from '@/shared/lib/tests/renderComponent';

import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  let btn: HTMLElement;

  beforeEach(() => {
    renderComponent(<ThemeSwitcher />, {
      theme: Theme.Light,
    });
    btn = screen.getByTestId('ThemeSwitcher');
  });

  test('render', () => {
    expect(btn).toBeInTheDocument();
  });

  test('switch', () => {
    expect(btn.getAttribute('data-testval')).toBe('light');
    fireEvent.click(btn);
    expect(btn.getAttribute('data-testval')).toBe('dark');
  });
});
