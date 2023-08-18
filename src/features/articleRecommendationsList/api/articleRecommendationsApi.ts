import { Article } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

interface RecommendationsArgs {
  limit: number
  /** the article currently being read — excluded so it can't recommend itself */
  excludeId?: string
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], RecommendationsArgs>({
      query: ({ limit, excludeId }) => ({
        url: '/articles',
        params: {
          _limit: limit,
          // join the author so recommended cards show "u/<name>" not "u/"
          _expand: 'user',
          // exclude the current article at the query level (json-server `_ne`)
          // so the row never includes the article you're already reading.
          ...(excludeId ? { id_ne: excludeId } : {}),
        },
      }),
    }),
  }),
})
export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery
