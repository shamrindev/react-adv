import { CardProps } from './Card.types'
import { Card as CardRedesigned } from './redesigned/Card'

export { CardTheme } from './Card.types'
export type { CardProps } from './Card.types'

export const Card = (props: CardProps) => <CardRedesigned {...props} />
