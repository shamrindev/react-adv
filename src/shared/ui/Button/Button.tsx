import { ButtonProps } from './Button.types'
import { Button as ButtonRedesigned } from './redesigned/Button'

export { ButtonTheme, ButtonSize } from './Button.types'
export type { ButtonProps } from './Button.types'

export const Button = (props: ButtonProps) => <ButtonRedesigned {...props} />
