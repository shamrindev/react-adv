import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLinkProps, AppLinkTheme } from '../AppLink.types'
import cls from './AppLink.module.scss'

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const {
    to,
    children,
    className,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props
  return (
    <Link
      to={to}
      className={classNames(cls.applink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  )
})
