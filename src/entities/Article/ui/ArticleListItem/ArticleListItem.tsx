import { toggleFeatures } from '@/shared/lib/features'
import { ArticleListItemProps } from './ArticleListItem.types'
import { ArticleListItem as ArticleListItemDeprecated } from './deprecated/ArticleListItem'
import { ArticleListItem as ArticleListItemRedesigned } from './redesigned/ArticleListItem'

export const ArticleListItem = (props: ArticleListItemProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ArticleListItemRedesigned {...props} />,
    off: () => <ArticleListItemDeprecated {...props} />,
  })
