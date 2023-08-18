import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page'
import { ArticleDetails } from '../../../../entities/Article'
import { articleDetailsPageReducer } from '../../model/slices'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComments } from '@/pages/ArticlesDetailsPage/ArticleDetailsComments/ArticleDetailsComments'

interface ArticlesDetailsPageProps {
  className?: string
  storybookId?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({
  className,
  storybookId,
}: ArticlesDetailsPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const articleId = storybookId || id

  if (!articleId) {
    return (
      <div className={classNames(cls.articledetailspage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.articledetailspage, {}, [className])}>
        {/* one centered, fixed-width column (article + recommendations +
            comments all line up), like a Reddit post page */}
        <div className={cls.detail}>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={articleId} />
          <ArticleRecommendationsList currentArticleId={articleId} />
          <ArticleDetailsComments id={articleId} />
        </div>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
