import { FC } from 'react';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter: FC = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(getCounterValue);
  const { increment, decrement, incrementByAmount } = counterActions;

  const onIncrement = () => {
    dispatch(increment());
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  const onAddFive = () => {
    dispatch(incrementByAmount(5));
  };

  return (
    <div>
      <h2 data-testid="value">{counterValue}</h2>
      <Button onClick={onIncrement} data-testid="increment">+</Button>
      <Button onClick={onAddFive} data-testid="add-five">+5</Button>
      <Button onClick={onDecrement} data-testid="decrement">-</Button>
    </div>
  );
};
