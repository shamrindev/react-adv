import { InputProps } from './Input.types'
import { Input as InputRedesigned } from './redesigned/Input'

export type { InputProps } from './Input.types'

export const Input = (props: InputProps) => <InputRedesigned {...props} />
