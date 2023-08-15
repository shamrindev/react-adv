import { StarRatingProps } from './StarRating.types'
import { StarRating as StarRatingRedesigned } from './redesigned/StarRating'

export type { StarRatingProps } from './StarRating.types'

export const StarRating = (props: StarRatingProps) => (
  <StarRatingRedesigned {...props} />
)
