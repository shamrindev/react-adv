import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
  it('should return counter', () => {
    const counter = {
      value: 0,
    };
    const state: DeepPartial<StateSchema> = {
      counter,
    };
    const result = getCounter(state as StateSchema);
    expect(result).toEqual(counter);
  });
});
