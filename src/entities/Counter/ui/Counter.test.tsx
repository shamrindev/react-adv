import { fireEvent, screen } from '@testing-library/react';
import { StateSchema } from '@/app/providers/StoreProvider';
import { renderComponent } from '@/shared/lib/tests/renderComponent';
import { Counter } from './Counter';

describe('Counter', () => {
  const initialState: DeepPartial<StateSchema> = {
    counter: {
      value: 10,
    },
  };

  test('should render counter value', () => {
    renderComponent(<Counter />, { initialState });
    const counterValue = screen.getByTestId('value');
    expect(counterValue).toHaveTextContent('10');
  });

  test('should increment counter value', () => {
    renderComponent(<Counter />, { initialState });
    const incrementButton = screen.getByTestId('increment');
    const counterValue = screen.getByTestId('value');
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('11');
  });

  test('should decrement counter value', () => {
    renderComponent(<Counter />, { initialState });
    const decrementButton = screen.getByTestId('decrement');
    const counterValue = screen.getByTestId('value');
    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent('9');
  });

  test('should add five to counter value', () => {
    renderComponent(<Counter />, { initialState });
    const addFiveButton = screen.getByTestId('add-five');
    const counterValue = screen.getByTestId('value');
    fireEvent.click(addFiveButton);
    expect(counterValue).toHaveTextContent('15');
  });

  test('should render without state', () => {
    renderComponent(<Counter />);
    const counterValue = screen.getByTestId('value');
    expect(counterValue).toHaveTextContent('0');
  });
});
