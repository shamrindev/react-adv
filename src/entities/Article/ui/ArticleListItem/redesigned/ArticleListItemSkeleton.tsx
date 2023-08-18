import { classNames } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Card } from '@/shared/ui/Card'
import { ArticleView } from '../../../model/consts/consts'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
  view: ArticleView
  className?: string
}

/**
 * Skeleton that mirrors the redesigned article card 1:1 (header row, title,
 * image, pill footer) so there is no layout shift when the real data arrives.
 */
export const ArticleListItemSkeletonRedesigned = ({
  view,
  className,
}: ArticleListItemSkeletonProps) => {
  const header = (
    <div className={cls.header}>
      <Skeleton width={24} height={24} border="50%" />
      <Skeleton width={70} height={12} border="6px" />
      <Skeleton width={120} height={12} border="6px" />
    </div>
  )

  const footer = (
    <div className={cls.footer}>
      <Skeleton width={72} height={32} border="999px" />
      <Skeleton width={96} height={32} border="999px" />
      <Skeleton width={96} height={32} border="999px" />
    </div>
  )

  if (view === ArticleView.SMALL) {
    return (
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls.SMALL])}
      >
        {header}
        <Skeleton width="90%" height={18} border="6px" />
        <Skeleton width="100%" height={160} border="12px" />
        {footer}
      </Card>
    )
  }

  return (
    <Card className={classNames(cls.ArticleListItem, {}, [className, cls.BIG])}>
      {header}
      <Skeleton width="70%" height={24} border="6px" />
      <Skeleton width="100%" height={14} border="6px" />
      <Skeleton width="95%" height={14} border="6px" />
      <Skeleton width="100%" height={250} border="12px" />
      {footer}
    </Card>
  )
}
