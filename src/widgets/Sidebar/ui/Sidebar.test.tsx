import { fireEvent, screen } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/tests/renderComponent';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('with only first param', () => {
    renderComponent(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
    renderComponent(<Sidebar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
