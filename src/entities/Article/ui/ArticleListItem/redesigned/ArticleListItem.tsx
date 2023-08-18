import { useTranslation } from 'react-i18next'
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg'
import CommentIcon from '@/shared/assets/icons/comment.svg'
import ShareIcon from '@/shared/assets/icons/share.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Card } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'
import { getRouteArticleDetails } from '@/shared/const/router'
import { ArticleTextBlock } from '../../../model/types/article'
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts'
import { useArticleVote } from '../../../lib/useArticleVote'
import { ArticleListItemProps } from '../ArticleListItem.types'
import cls from './ArticleListItem.module.scss'

export const ArticleListItem = ({
  className,
  article,
  view,
  target = '_self',
}: ArticleListItemProps) => {
  const { t } = useTranslation()

  const community = article.type?.[0] ?? ''
  const detailsRoute = getRouteArticleDetails(article.id)
  const author = article.user?.username ? `u/${article.user.username} · ` : ''
  // built as variables (not JSX literals) so the `r/` and `·` separators don't
  // trip the i18next no-literal-string rule
  const communityLabel = `r/${community}`
  const metaLabel = `· ${author}${article.createdAt}`
  const { vote, score, upvote, downvote } = useArticleVote(
    article.id,
    article.views
  )

  // shown when an article image is missing, 404s, or is a dead 1x1 hotlink
  const imgPlaceholder = (
    <div className={cls.imgPlaceholder}>
      <Icon Svg={ArticleIcon} width={28} height={28} />
    </div>
  )

  const header = (
    <div className={cls.header}>
      <Avatar
        size={24}
        src={article.user?.avatar}
        className={cls.communityAvatar}
      />
      <span className={cls.community}>{communityLabel}</span>
      <span className={cls.meta}>{metaLabel}</span>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <span className={cls.dots}>···</span>
    </div>
  )

  const footer = (
    <div className={cls.footer}>
      <div className={cls.votePill}>
        <button
          type="button"
          className={cls.voteBtn}
          onClick={upvote}
          aria-label={t('Голос за')}
          aria-pressed={vote === 1}
        >
          <Icon
            Svg={ArrowUpIcon}
            width={18}
            height={18}
            className={classNames(cls.upIcon, { [cls.up]: vote === 1 })}
          />
        </button>
        <span
          className={classNames(cls.voteCount, {
            [cls.up]: vote === 1,
            [cls.down]: vote === -1,
          })}
        >
          {score}
        </span>
        <button
          type="button"
          className={cls.voteBtn}
          onClick={downvote}
          aria-label={t('Голос против')}
          aria-pressed={vote === -1}
        >
          <Icon
            Svg={ArrowDownIcon}
            width={18}
            height={18}
            className={classNames(cls.downIcon, { [cls.down]: vote === -1 })}
          />
        </button>
      </div>
      <div className={cls.pill}>
        <Icon Svg={CommentIcon} width={18} height={18} />
        <span className={cls.pillText}>{t('Обсудить')}</span>
      </div>
      <div className={cls.pill}>
        <Icon Svg={ShareIcon} width={18} height={18} />
        <span className={cls.pillText}>{t('Поделиться')}</span>
      </div>
    </div>
  )

  const title = (
    <AppLink to={detailsRoute} target={target} className={cls.titleLink}>
      <h3 className={cls.title}>{article.title}</h3>
    </AppLink>
  )

  if (view === ArticleView.SMALL) {
    return (
      <Card
        data-testid={'ArticleListItem'}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        {header}
        {title}
        {article.img && (
          <AppLink to={detailsRoute} target={target} className={cls.imageLink}>
            <AppImage
              src={article.img}
              alt={article.title}
              className={cls.img}
              fallback={<Skeleton width="100%" height={140} />}
              errorFallback={imgPlaceholder}
            />
          </AppLink>
        )}
        {footer}
      </Card>
    )
  }

  const textBlock = article.blocks?.find(
    (block): block is ArticleTextBlock => block.type === ArticleBlockType.TEXT
  )

  return (
    <Card
      data-testid={'ArticleListItem'}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      {header}
      {title}
      {textBlock?.paragraphs?.[0] && (
        <p className={cls.snippet}>{textBlock.paragraphs[0]}</p>
      )}
      {article.img && (
        <AppLink to={detailsRoute} target={target} className={cls.imageLink}>
          <AppImage
            src={article.img}
            alt={article.title}
            className={cls.img}
            fallback={<Skeleton width="100%" height={250} />}
            errorFallback={imgPlaceholder}
          />
        </AppLink>
      )}
      {footer}
    </Card>
  )
}
