import { ArticleView } from '../../model/consts/consts'
import { ArticleListItemSkeletonRedesigned } from './redesigned/ArticleListItemSkeleton'

interface ArticleListItemSkeletonProps {
  view: ArticleView
  className?: string
}

export const ArticleListItemSkeleton = (
  props: ArticleListItemSkeletonProps
) => <ArticleListItemSkeletonRedesigned {...props} />
