import { toggleFeatures } from '@/shared/lib/features'
import { CommentCardProps } from './CommentCard.types'
import { CommentCard as CommentCardDeprecated } from './deprecated/CommentCard'
import { CommentCard as CommentCardRedesigned } from './redesigned/CommentCard'

export type { CommentCardProps } from './CommentCard.types'

export const CommentCard = (props: CommentCardProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <CommentCardRedesigned {...props} />,
    off: () => <CommentCardDeprecated {...props} />,
  })
