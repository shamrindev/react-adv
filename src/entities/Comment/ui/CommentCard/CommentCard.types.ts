import { Comment } from '../../model/types/comment'

export interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}
