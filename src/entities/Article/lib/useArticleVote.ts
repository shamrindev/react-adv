import { useCallback, useEffect, useState } from 'react'

export type VoteValue = 1 | -1 | 0

const STORAGE_KEY = 'arthub_article_votes'

const readVotes = (): Record<string, VoteValue> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

const persistVote = (articleId: string, value: VoteValue) => {
  const all = readVotes()
  if (value === 0) {
    delete all[articleId]
  } else {
    all[articleId] = value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

interface UseArticleVoteResult {
  vote: VoteValue
  score: number
  upvote: () => void
  downvote: () => void
}

/**
 * Reddit-style up/down voting. The visitor's own vote is kept in localStorage
 * and layered on top of the seed score (article.views), so a click toggles the
 * arrow, nudges the score, and survives reloads — without needing a per-user
 * votes table on the mock backend. Clicking the active arrow again removes the
 * vote, exactly like Reddit.
 */
export function useArticleVote(
  articleId: string,
  baseScore: number
): UseArticleVoteResult {
  const [vote, setVote] = useState<VoteValue>(() => readVotes()[articleId] ?? 0)

  // article details load async, so the id arrives after first render — re-sync
  // the stored vote whenever the id changes.
  useEffect(() => {
    setVote(readVotes()[articleId] ?? 0)
  }, [articleId])

  const apply = useCallback(
    (next: VoteValue) => {
      setVote((prev) => {
        const value = prev === next ? 0 : next
        persistVote(articleId, value)
        return value
      })
    },
    [articleId]
  )

  return {
    vote,
    score: baseScore + vote,
    upvote: useCallback(() => apply(1), [apply]),
    downvote: useCallback(() => apply(-1), [apply]),
  }
}
