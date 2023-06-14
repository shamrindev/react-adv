import { toggleFeatures } from '@/shared/lib/features'
import { InputProps } from './Input.types'
import { Input as InputDeprecated } from './deprecated/Input'
import { Input as InputRedesigned } from './redesigned/Input'

export type { InputProps } from './Input.types'

export const Input = (props: InputProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <InputRedesigned {...props} />,
    off: () => <InputDeprecated {...props} />,
  })
