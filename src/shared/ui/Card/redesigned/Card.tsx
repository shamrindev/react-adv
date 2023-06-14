import { classNames } from '@/shared/lib/classNames/classNames'
import { CardProps, CardTheme } from '../Card.types'
import cls from './Card.module.scss'

export const Card = ({
  className,
  children,
  theme = CardTheme.NORMAL,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={classNames(cls.card, {}, [className, cls[theme]])}
    >
      {children}
    </div>
  )
}
