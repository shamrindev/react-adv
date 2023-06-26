import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { toggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { StickyContentLayout } from '@/shared/layouts'
import { memo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { initArticlesPage } from '../../model/services/initArticlesPage'
import { articlesPageReducer } from '../../model/slice/articlesPageSlice'
import { ScrollToTopButton } from '@/features/scrollToTopButton'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import cls from './ArticlesPage.module.scss'

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  const content = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <StickyContentLayout
        content={
          <div
            className={cls.articlePageRedesigned}
            data-testid={'ArticlesPage'}
          >
            <ArticleInfiniteList className={cls.list} />
            <ScrollToTopButton />
          </div>
        }
        right={<FiltersContainer />}
      />
    ),
    off: () => (
      <div className={cls.articlePage} data-testid={'ArticlesPage'}>
        <ArticlesPageFilters />
        <ArticleInfiniteList className={cls.list} virtual />
      </div>
    ),
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  )
}
export default memo(ArticlesPage)
