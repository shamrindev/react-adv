import { SelectProps } from './Select.types'
import { Select as SelectRedesigned } from './redesigned/Select'

export type { SelectOptions, SelectProps } from './Select.types'

export const Select = <T extends string>(props: SelectProps<T>) => (
  <SelectRedesigned {...props} />
)
