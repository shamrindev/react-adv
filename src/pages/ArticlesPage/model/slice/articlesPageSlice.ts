import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import {
  Article,
  ArticleView,
  ArticleSortField,
  ArticleType,
} from '@/entities/Article'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../services/fetchArticleList'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { SortOrder } from '@/shared/types'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    limit: 8,
    hasMore: true,
    // default to most-viewed first: it gives a "popular/hot" feed (like the
    // home page) and, unlike CREATED, the `views` field actually matches a
    // json-server column so the sort takes effect.
    sort: ArticleSortField.VIEWS,
    order: 'desc',
    search: '',
    type: ArticleType.ALL,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },

    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    initState: (state) => {
      // saved user preference wins; otherwise the redesigned (Reddit-like)
      // feed defaults to the single-column card view, the old design to tiles.
      // Previously an empty localStorage left view = null here.
      const saved = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView | null
      // saved user preference wins; otherwise the redesigned feed defaults to
      // the single-column card (BIG) view.
      const view = saved ?? ArticleView.BIG
      state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 8
      state._inited = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        if (action.payload.total < state.page * state.limit) {
          state.hasMore = false
        }
        state.isLoading = false
        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload.articles)
        } else {
          articlesAdapter.addMany(state, action.payload.articles)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  },
})

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice
