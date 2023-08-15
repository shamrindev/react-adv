import { memo } from 'react'
import { CommentCardProps } from './CommentCard.types'
import { CommentCard as CommentCardRedesigned } from './redesigned/CommentCard'

export type { CommentCardProps } from './CommentCard.types'

// memoized: comment lists re-render with the parent; per-comment props are stable
export const CommentCard = memo((props: CommentCardProps) => (
  <CommentCardRedesigned {...props} />
))

CommentCard.displayName = 'CommentCard'
