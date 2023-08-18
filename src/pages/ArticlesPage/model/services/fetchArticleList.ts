import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article, ArticleType } from '@/entities/Article'
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../selectors/articlesPageSelectors'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'

interface FetchArticleListProps {
  replace?: boolean
}

export interface FetchArticlesResult {
  articles: Article[]
  // total number of matching articles (from the x-total-count header) — used to
  // decide whether more pages remain for infinite scroll
  total: number
}

export const fetchArticlesList = createAsyncThunk<
  FetchArticlesResult,
  FetchArticleListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi
  const page = getArticlesPageNum(getState())
  const limit = getArticlesPageLimit(getState())
  const sort = getArticlesPageSort(getState())
  const order = getArticlesPageOrder(getState())
  const search = getArticlesPageSearch(getState())
  const type = getArticlesPageType(getState())

  try {
    addQueryParams({ sort, order, search, type })
    const res = await extra.api.get<Article[]>(`/articles`, {
      params: {
        // json-server: _expand pulls the related `user` entity in (see
        // json-server docs #relationships)
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    })
    if (!res.data) {
      throw new Error()
    }

    // map to a serializable payload — never put the raw AxiosResponse (headers,
    // config, request) into Redux state
    return {
      articles: res.data,
      total: Number(res.headers['x-total-count']) || 0,
    }
  } catch (e) {
    return rejectWithValue('error')
  }
})
