import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  test('Modal renders with default props', () => {
    render(<Modal isOpen={false} onClose={() => {}}>content</Modal>);
    const modal = screen.getByText('content');
    expect(modal).toBeInTheDocument();
  });

  test('Modal opens and closes correctly', () => {
    const { rerender } = render(<Modal isOpen={false} onClose={() => {}} />);
    const modal = screen.getByTestId('modal');

    expect(modal).not.toHaveClass('opened');

    rerender(<Modal isOpen onClose={() => {}} />);
    expect(modal).toHaveClass('opened');

    rerender(<Modal isOpen={false} onClose={() => {}} />);
    expect(modal).not.toHaveClass('opened');
  });

  test('Modal closes on overlay click', () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose} />);
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  test('Modal closes with Escape key', () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
