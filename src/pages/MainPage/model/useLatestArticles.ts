import { useEffect, useState } from 'react'
import { $api } from '@/shared/api/api'
import { Article } from '@/entities/Article'

interface UseLatestArticlesResult {
  articles: Article[]
  isLoading: boolean
  error?: string
}

/**
 * Lightweight, read-only fetch of the most popular articles for the home feed.
 * Public endpoint (json-server allows guest GETs), so the feed renders for
 * unauthenticated visitors too. Kept out of the redux store on purpose — this
 * is a self-contained preview, not the paginated /articles experience.
 */
export function useLatestArticles(limit = 6): UseLatestArticlesResult {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    let active = true
    setIsLoading(true)

    $api
      .get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _sort: 'views',
          _order: 'desc',
        },
      })
      .then((res) => {
        if (!active) return
        setArticles(res.data ?? [])
        setError(undefined)
      })
      .catch(() => {
        if (active) setError('error')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [limit])

  return { articles, isLoading, error }
}
