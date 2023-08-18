import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { memo } from 'react'
import { ArticleImgBlock } from '../../model/types/article'
import { Text, TextAlign } from '@/shared/ui/Text'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Icon } from '@/shared/ui/Icon'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImgBlock
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    // dead/placeholder image URLs are common in the seed data — show a tidy
    // fallback instead of the browser's broken-image glyph.
    const errorFallback = (
      <div className={cls.placeholder}>
        <Icon Svg={ArticleIcon} width={28} height={28} />
      </div>
    )

    return (
      <div
        className={classNames(cls.articleimageblockcomponent, {}, [className])}
      >
        <AppImage
          src={block.src}
          className={cls.img}
          alt={block.title}
          fallback={<Skeleton width="100%" height={240} border="12px" />}
          errorFallback={errorFallback}
        />
        {block.title && (
          <Text
            text={block.title}
            align={TextAlign.CENTER}
            className={cls.caption}
          />
        )}
      </div>
    )
  }
)
