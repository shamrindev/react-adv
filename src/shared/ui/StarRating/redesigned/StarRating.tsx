import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/star.svg'
import { Icon } from '../../Icon'
import { StarRatingProps } from '../StarRating.types'
import cls from './StarRating.module.scss'

const stars = [1, 2, 3, 4, 5]

export const StarRating = ({
  className,
  onSelect,
  size = 30,
  selectedStars = 0,
}: StarRatingProps) => {
  const { t } = useTranslation()
  const [currentStarCount, setCurrentStarCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starsCount)
    }
  }

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0)
    }
  }
  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setCurrentStarCount(starsCount)
      setIsSelected(true)
    }
  }

  return (
    <div
      className={classNames(cls.starrating, {}, [className])}
      role="group"
      aria-label={t('Оцените статью')}
    >
      {stars.map((starNumber) => (
        // a real <button> per star: focusable, keyboard-operable (Enter/Space),
        // and labelled — keyboard and screen-reader users can rate
        <button
          type="button"
          key={starNumber}
          className={cls.starBtn}
          disabled={isSelected}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
          aria-label={t('Оценить на {{count}} из 5', { count: starNumber })}
          aria-pressed={currentStarCount >= starNumber}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarCount >= starNumber}
        >
          <Icon
            className={classNames(
              cls.starIcon,
              {
                [cls.hovered]: currentStarCount >= starNumber,
                [cls.normal]: currentStarCount < starNumber,
              },
              []
            )}
            Svg={StarIcon}
            width={size}
            height={size}
          />
        </button>
      ))}
    </div>
  )
}
