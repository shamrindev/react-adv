import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
  it('should return counter value', () => {
    const counter = {
      value: 0,
    };
    const state: DeepPartial<StateSchema> = {
      counter,
    };
    const result = getCounterValue(state as StateSchema);
    expect(result).toEqual(0);
  });
});
