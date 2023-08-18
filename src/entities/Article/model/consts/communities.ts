import { ArticleType } from './consts'

export interface ArticleCommunity {
  /** matches an ArticleType value so the link filters the feed */
  name: ArticleType
  /** CSS custom property used for the community dot colour */
  color: string
  /** short Russian description, passed through i18n */
  desc: string
}

// the curated "featured" communities shown in the sidebar and on the home page.
// single source of truth so the nav and the landing page never drift apart.
export const ARTICLE_COMMUNITIES: ArticleCommunity[] = [
  {
    name: ArticleType.IT,
    color: 'var(--accent-up)',
    desc: 'Программирование и разработка',
  },
  {
    name: ArticleType.AI,
    color: 'var(--accent-down)',
    desc: 'Искусственный интеллект',
  },
  {
    name: ArticleType.BLOCKCHAIN,
    color: 'var(--accent-positive)',
    desc: 'Блокчейн и крипто',
  },
]
