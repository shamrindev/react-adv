import { HTMLAttributeAnchorTarget } from 'react'
import { Article } from '../../model/types/article'
import { ArticleView } from '../../model/consts/consts'

export interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}
