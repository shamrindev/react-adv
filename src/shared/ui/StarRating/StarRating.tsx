import { toggleFeatures } from '@/shared/lib/features'
import { StarRatingProps } from './StarRating.types'
import { StarRating as StarRatingDeprecated } from './deprecated/StarRating'
import { StarRating as StarRatingRedesigned } from './redesigned/StarRating'

export type { StarRatingProps } from './StarRating.types'

export const StarRating = (props: StarRatingProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <StarRatingRedesigned {...props} />,
    off: () => <StarRatingDeprecated {...props} />,
  })
