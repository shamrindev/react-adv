import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { AppLink } from '@/shared/ui/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { getRouteArticles } from '@/shared/const/router'
import { SidebarItem } from '../../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../../model/selectors/getSidebarItems'
import cls from './Sidebar.module.scss'
import { SidebarProps } from '../deprecated/Sidebar'

interface CommunityItem {
  name: string
  color: string
}

const communities: CommunityItem[] = [
  { name: 'IT', color: 'var(--accent-up)' },
  { name: 'SCIENCE', color: 'var(--accent-down)' },
  { name: 'ECONOMICS', color: 'var(--accent-positive)' },
]

export const Sidebar: FC<SidebarProps> = memo(({ className }: SidebarProps) => {
  const { t } = useTranslation()
  const sidebarItemsList = useSelector(getSidebarItems)

  const itemList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} />
      )),
    [sidebarItemsList]
  )

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.sidebar, {}, [className])}
    >
      <VStack role="navigation" gap="4" max className={cls.nav}>
        {itemList}
      </VStack>

      <div className={cls.section}>
        <span className={cls.sectionLabel}>{t('СООБЩЕСТВА')}</span>
        <VStack gap="4" max>
          {communities.map((community) => (
            <AppLink
              key={community.name}
              to={getRouteArticles()}
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

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </aside>
  )
})
