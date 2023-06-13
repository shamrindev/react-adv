import { toggleFeatures } from '@/shared/lib/features'
import { ButtonProps } from './Button.types'
import { Button as ButtonDeprecated } from './deprecated/Button'
import { Button as ButtonRedesigned } from './redesigned/Button'

export { ButtonTheme, ButtonSize } from './Button.types'
export type { ButtonProps } from './Button.types'

export const Button = (props: ButtonProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ButtonRedesigned {...props} />,
    off: () => <ButtonDeprecated {...props} />,
  })
