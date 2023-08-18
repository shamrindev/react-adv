import { ArticleList, ArticleListWrap } from '@/entities/Article'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'
import { useArticleRecommendationsList } from '../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
  className?: string
  currentArticleId?: string
}

const RECOMMENDATIONS_COUNT = 3

export const ArticleRecommendationsList = ({
  className,
  currentArticleId,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation()

  // the current article is excluded server-side, so the row is always a full
  // set of other articles (and never recommends itself).
  const {
    data: recommendations,
    error,
    isLoading,
  } = useArticleRecommendationsList({
    limit: RECOMMENDATIONS_COUNT,
    excludeId: currentArticleId,
  })

  if (isLoading || error || !recommendations?.length) {
    return null
  }

  return (
    <VStack
      data-testid={'ArticleRecommendationsList'}
      gap="8"
      className={classNames('', {}, [className])}
    >
      <Text size={TextSize.L} title={t('Рекоммендуем')} />
      <ArticleList
        articles={recommendations}
        isLoading={isLoading}
        wrap={ArticleListWrap.NO_WRAP}
        target="_blank"
      />
    </VStack>
  )
}
