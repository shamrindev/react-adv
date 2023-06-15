import { toggleFeatures } from '@/shared/lib/features'
import { SelectProps } from './Select.types'
import { Select as SelectDeprecated } from './deprecated/Select'
import { Select as SelectRedesigned } from './redesigned/Select'

export type { SelectOptions, SelectProps } from './Select.types'

export const Select = <T extends string>(props: SelectProps<T>) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <SelectRedesigned {...props} />,
    off: () => <SelectDeprecated {...props} />,
  })
