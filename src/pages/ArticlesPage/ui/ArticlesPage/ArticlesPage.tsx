import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { StickyContentLayout } from '@/shared/layouts'
import { Page } from '@/widgets/Page'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { initArticlesPage } from '../../model/services/initArticlesPage'
import { fetchArticlesList } from '../../model/services/fetchArticleList'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlePage'
import {
  articlesPageActions,
  articlesPageReducer,
} from '../../model/slice/articlesPageSlice'
import {
  getArticlesPageInited,
  getArticlesPageSearch,
  getArticlesPageType,
} from '../../model/selectors/articlesPageSelectors'
import { ArticleType } from '@/entities/Article'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import cls from './ArticlesPage.module.scss'

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const inited = useSelector(getArticlesPageInited)
  const searchInStore = useSelector(getArticlesPageSearch)
  const urlSearch = searchParams.get('search') ?? ''
  const typeInStore = useSelector(getArticlesPageType)
  // ignore unknown ?type= values (e.g. a stale/removed community) so a bad link
  // falls back to "all" instead of sending a filter that matches no articles.
  const rawType = searchParams.get('type')
  const urlType = Object.values(ArticleType).includes(rawType as ArticleType)
    ? (rawType as ArticleType)
    : ArticleType.ALL

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  // keep the feed in sync with the `?search=` query param so the navbar search
  // (which just navigates here) re-filters on every navigation. initArticlesPage
  // owns the first URL→store sync, so skip until inited to avoid a double fetch.
  useEffect(() => {
    if (inited && urlSearch !== searchInStore) {
      dispatch(articlesPageActions.setSearch(urlSearch))
      dispatch(articlesPageActions.setPage(1))
      dispatch(fetchArticlesList({ replace: true }))
    }
    // only react to URL changes; store equality is checked inside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearch])

  // same pattern for the `?type=` param so the sidebar/home "communities" links
  // re-filter the feed by ArticleType on every navigation, not just first mount.
  useEffect(() => {
    if (inited && urlType !== typeInStore) {
      dispatch(articlesPageActions.setType(urlType))
      dispatch(articlesPageActions.setPage(1))
      dispatch(fetchArticlesList({ replace: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlType])

  const onLoadNext = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {/* one outer <Page> owns the scroll (like the home page), so the feed
          shares the global page scrollbar instead of a nested one. */}
      <Page onScrollEnd={onLoadNext}>
        <StickyContentLayout
          content={
            <div
              className={cls.articlePageRedesigned}
              data-testid={'ArticlesPage'}
            >
              <ArticleInfiniteList listClassName={cls.cards} />
            </div>
          }
          right={<FiltersContainer />}
        />
      </Page>
    </DynamicModuleLoader>
  )
}
export default ArticlesPage
