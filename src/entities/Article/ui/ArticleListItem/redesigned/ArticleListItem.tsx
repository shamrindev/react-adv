import { useTranslation } from 'react-i18next'
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg'
import CommentIcon from '@/shared/assets/icons/comment.svg'
import ShareIcon from '@/shared/assets/icons/share.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Card } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { Text } from '@/shared/ui/Text'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'
import { getRouteArticleDetails } from '@/shared/const/router'
import { ArticleTextBlock } from '../../../model/types/article'
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts'
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

  const header = (
    <div className={cls.header}>
      <Avatar
        size={24}
        src={article.user?.avatar}
        className={cls.communityAvatar}
      />
      <Text text={`r/${community}`} className={cls.community} />
      <Text
        text={`· u/${article.user?.username ?? ''} · ${article.createdAt}`}
        className={cls.meta}
      />
      <Text text="···" className={cls.dots} />
    </div>
  )

  const footer = (
    <div className={cls.footer}>
      <div className={cls.votePill}>
        <Icon Svg={ArrowUpIcon} width={18} height={18} className={cls.upIcon} />
        <Text text={String(article.views)} className={cls.voteCount} />
        <Icon
          Svg={ArrowDownIcon}
          width={18}
          height={18}
          className={cls.downIcon}
        />
      </div>
      <div className={cls.pill}>
        <Icon Svg={CommentIcon} width={18} height={18} />
        <Text text={String(article.views)} className={cls.pillText} />
      </div>
      <div className={cls.pill}>
        <Icon Svg={ShareIcon} width={18} height={18} />
        <Text text={t('Поделиться')} className={cls.pillText} />
      </div>
    </div>
  )

  if (view === ArticleView.SMALL) {
    return (
      <Card
        data-testid={'ArticleListItem'}
        className={classNames(cls.ArticleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        {header}
        <AppLink to={detailsRoute} target={target} className={cls.titleLink}>
          <Text title={article.title} className={cls.title} />
        </AppLink>
        {article.img && (
          <AppLink to={detailsRoute} target={target} className={cls.imageLink}>
            <AppImage
              src={article.img}
              alt={article.title}
              className={cls.img}
              fallback={<Skeleton width="100%" height={140} />}
            />
          </AppLink>
        )}
        {footer}
      </Card>
    )
  }

  const textBlock = article.blocks?.find(
    (block) => block.type === ArticleBlockType.TEXT
  ) as ArticleTextBlock | undefined

  return (
    <Card
      data-testid={'ArticleListItem'}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      {header}
      <AppLink to={detailsRoute} target={target} className={cls.titleLink}>
        <Text title={article.title} className={cls.title} />
      </AppLink>
      {textBlock?.paragraphs?.[0] && (
        <Text text={textBlock.paragraphs[0]} className={cls.snippet} />
      )}
      {article.img && (
        <AppLink to={detailsRoute} target={target} className={cls.imageLink}>
          <AppImage
            src={article.img}
            alt={article.title}
            className={cls.img}
            fallback={<Skeleton width="100%" height={250} />}
          />
        </AppLink>
      )}
      {footer}
    </Card>
  )
}
