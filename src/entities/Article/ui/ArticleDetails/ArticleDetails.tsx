import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetails.module.scss'
import { useSelector } from 'react-redux'
import { Text, TextAlign } from '@/shared/ui/Text'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { TextTheme } from '@/shared/ui/Text'
import { ArticleBlock } from '../../model/types/article'
import { ArticleBlockType } from '../../model/consts/consts'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from '@/shared/ui/Stack'
import { ArticleDetailsRedesigned } from './redesigned/ArticleDetailsRedesigned'
import { ArticleDetailsSkeletonRedesigned } from './redesigned/ArticleDetailsSkeleton'

interface ArticleDetailsProps {
  className?: string
  id?: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('article')
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    const dispatch = useAppDispatch()

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          )
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          )
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          )
        default:
          return null
      }
    }, [])

    useInitialEffect(() => dispatch(fetchArticleById(id)))

    let content
    if (isLoading) {
      content = <ArticleDetailsSkeletonRedesigned />
    } else if (error) {
      content = (
        <Text
          title={t('Произошла ошибка при загрузке страницы')}
          align={TextAlign.CENTER}
          theme={TextTheme.ERROR}
        />
      )
    } else {
      content = (
        <ArticleDetailsRedesigned article={article} renderBlock={renderBlock} />
      )
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack
          data-testid="ArticleDetails.Info"
          gap="16"
          max
          className={classNames(cls.articledetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    )
  }
)
