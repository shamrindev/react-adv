import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import { memo } from 'react'
import { ArticleTextBlock } from '../../model/types/article'
import { Text } from '@/shared/ui/Text'
interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.articletextblockcomponent, {}, [className])}
      >
        {/* a plain heading (not <Text title>) so this body sub-heading keeps its
            own smaller size instead of inheriting the 24px post-title style */}
        {block.title && <h3 className={cls.title}>{block.title}</h3>}
        {block.paragraphs.map((paragraph) => {
          return (
            <Text key={paragraph} text={paragraph} className={cls.paragraph} />
          )
        })}
      </div>
    )
  }
)
