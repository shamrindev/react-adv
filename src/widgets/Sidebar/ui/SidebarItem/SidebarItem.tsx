import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { SidebarItemType } from '../../model/items'
import cls from './SidebarItem.module.scss'
import { getUserAuthData } from '@/entities/User'

interface SidebarItemProps {
  item?: SidebarItemType
  collapsed?: boolean
  /** Reddit-like row: outline icon, hover bg, active-route highlight */
  redesigned?: boolean
}

export const SidebarItem: FC<SidebarItemProps> = memo(
  ({
    item = {} as SidebarItemType,
    collapsed,
    redesigned,
  }: SidebarItemProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)
    const { pathname } = useLocation()

    if (item.authOnly && !isAuth) {
      return null
    }

    const ItemIcon =
      redesigned && item.IconRedesigned ? item.IconRedesigned : item.Icon
    const isActive = redesigned && pathname === item.path

    return (
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item?.path || '/'}
        className={classNames(cls.item, {
          [cls.collapsed]: collapsed,
          [cls.redesigned]: redesigned,
          [cls.active]: isActive,
        })}
      >
        <ItemIcon className={cls.icon} />
        <span className={cls.link}> {t(`${item?.text}`)} </span>
      </AppLink>
    )
  }
)
