import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg'
import CommentIcon from '@/shared/assets/icons/comment.svg'
import ShareIcon from '@/shared/assets/icons/share.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Icon } from '@/shared/ui/Icon'
import { Text } from '@/shared/ui/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Article, ArticleBlock } from '../../../model/types/article'
import { useArticleVote } from '../../../lib/useArticleVote'
import cls from './ArticleDetailsRedesigned.module.scss'

interface ArticleDetailsRedesignedProps {
  article?: Article
  renderBlock: (block: ArticleBlock) => ReactNode
}

export const ArticleDetailsRedesigned = ({
  article,
  renderBlock,
}: ArticleDetailsRedesignedProps) => {
  const { t } = useTranslation('article')

  const community = article?.type?.[0] ?? ''
  const { vote, score, upvote, downvote } = useArticleVote(
    article?.id ?? '',
    article?.views ?? 0
  )

  return (
    <div className={cls.ArticleDetailsRedesigned}>
      <div className={cls.header}>
        <Avatar size={32} src={article?.user?.avatar} className={cls.avatar} />
        <Text text={`r/${community}`} className={cls.community} />
        <Text
          text={`· u/${article?.user?.username ?? ''} · ${
            article?.createdAt ?? ''
          }`}
          className={cls.meta}
        />
      </div>

      <Text title={article?.title} className={cls.title} />
      {article?.subtitle && (
        <Text text={article.subtitle} className={cls.subtitle} />
      )}

      <div className={cls.blocks}>{article?.blocks.map(renderBlock)}</div>

      <div className={cls.actions}>
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
          <Text
            text={String(score)}
            className={classNames(cls.voteCount, {
              [cls.up]: vote === 1,
              [cls.down]: vote === -1,
            })}
          />
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
          <Text text={t('Обсудить')} className={cls.pillText} />
        </div>
        <div className={cls.pill}>
          <Icon Svg={ShareIcon} width={18} height={18} />
          <Text text={t('Поделиться')} className={cls.pillText} />
        </div>
      </div>
    </div>
  )
}
