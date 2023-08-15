import { memo } from 'react'
import { ArticleListItemProps } from './ArticleListItem.types'
import { ArticleListItem as ArticleListItemRedesigned } from './redesigned/ArticleListItem'

// memoized: a feed renders many rows under a parent that re-renders often
// (scroll/filters); per-item props are stable, so memo skips the subtree
export const ArticleListItem = memo((props: ArticleListItemProps) => (
  <ArticleListItemRedesigned {...props} />
))

ArticleListItem.displayName = 'ArticleListItem'
