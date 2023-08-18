import { Skeleton } from '@/shared/ui/Skeleton'
import cls from './ArticleDetailsRedesigned.module.scss'

/**
 * Loading skeleton that mirrors ArticleDetailsRedesigned 1:1 (header row, title,
 * subtitle, action pills, body blocks) so there is no layout shift when the
 * real article arrives.
 */
export const ArticleDetailsSkeletonRedesigned = () => {
  return (
    <div className={cls.ArticleDetailsRedesigned}>
      <div className={cls.header}>
        <Skeleton width={32} height={32} border="50%" />
        <Skeleton width={64} height={12} border="6px" />
        <Skeleton width={140} height={12} border="6px" />
      </div>

      <Skeleton width="70%" height={26} border="6px" />
      <Skeleton width="45%" height={16} border="6px" />

      <div className={cls.actions}>
        <Skeleton width={92} height={36} border="999px" />
        <Skeleton width={112} height={36} border="999px" />
        <Skeleton width={112} height={36} border="999px" />
      </div>

      <div className={cls.blocks}>
        <Skeleton width="100%" height={14} border="6px" />
        <Skeleton width="100%" height={14} border="6px" />
        <Skeleton width="80%" height={14} border="6px" />
        <Skeleton width="100%" height={240} border="12px" />
      </div>
    </div>
  )
}
