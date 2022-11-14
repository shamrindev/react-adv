import { render, screen } from '@testing-library/react';
import { __name__ } from './__name__';

describe('__name__', () => {
  test('Test render', () => {
    render(<__name__>test</__name__>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
