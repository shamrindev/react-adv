import { FC, memo, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { AppLink } from '@/shared/ui/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { getRouteArticles } from '@/shared/const/router'
import { ARTICLE_COMMUNITIES } from '@/entities/Article'
import { SidebarItem } from '../../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../../model/selectors/getSidebarItems'
import cls from './Sidebar.module.scss'

export interface SidebarProps {
  className?: string
  /** controls the mobile off-canvas drawer */
  isMobileOpen?: boolean
  onClose?: () => void
}

export const Sidebar: FC<SidebarProps> = memo(
  ({ className, isMobileOpen, onClose }: SidebarProps) => {
    const { t } = useTranslation()
    const sidebarItemsList = useSelector(getSidebarItems)

    // let keyboard users dismiss the mobile drawer with Escape
    useEffect(() => {
      if (!isMobileOpen) {
        return
      }
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.()
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }, [isMobileOpen, onClose])

    const itemList = useMemo(
      () =>
        sidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} redesigned />
        )),
      [sidebarItemsList]
    )

    return (
      <>
        {isMobileOpen && (
          <div className={cls.overlay} onClick={onClose} aria-hidden="true" />
        )}
        <aside
          data-testid="sidebar"
          className={classNames(
            cls.sidebar,
            { [cls.mobileOpen]: isMobileOpen },
            [className]
          )}
          // a tap on a nav link should dismiss the mobile drawer; the switchers
          // below stop propagation so toggling theme/lang keeps it open
          onClick={onClose}
        >
          <VStack role="navigation" gap="4" max className={cls.nav}>
            {itemList}
          </VStack>

          <div className={cls.section}>
            <span className={cls.sectionLabel}>{t('СООБЩЕСТВА')}</span>
            <VStack gap="4" max>
              {ARTICLE_COMMUNITIES.map((community) => (
                <AppLink
                  key={community.name}
                  to={`${getRouteArticles()}?type=${encodeURIComponent(
                    community.name
                  )}`}
                  className={cls.community}
                >
                  <span
                    className={cls.dot}
                    style={{ backgroundColor: community.color }}
                  />
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <span className={cls.communityName}>r/{community.name}</span>
                </AppLink>
              ))}
            </VStack>
          </div>

          <div className={cls.switchers} onClick={(e) => e.stopPropagation()}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} />
          </div>
        </aside>
      </>
    )
  }
)
