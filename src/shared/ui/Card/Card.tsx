import { toggleFeatures } from '@/shared/lib/features'
import { CardProps } from './Card.types'
import { Card as CardDeprecated } from './deprecated/Card'
import { Card as CardRedesigned } from './redesigned/Card'

export { CardTheme } from './Card.types'
export type { CardProps } from './Card.types'

export const Card = (props: CardProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <CardRedesigned {...props} />,
    off: () => <CardDeprecated {...props} />,
  })
