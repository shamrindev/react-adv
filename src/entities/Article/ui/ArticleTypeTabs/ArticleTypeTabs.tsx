import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'

import { useMemo } from 'react'
import { TabItem, Tabs } from '@/shared/ui/Tabs'
import { ArticleType } from '../../model/consts/consts'

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeTab: (tab: TabItem<ArticleType>) => void
}

export const ArticleTypeTabs = ({
  className,
  value,
  onChangeTab,
}: ArticleTypeTabsProps) => {
  // the category labels (IT, Data Science, …) live in the `articles` namespace,
  // not the default one — without this the tab bar renders raw English keys in RU
  const { t } = useTranslation('articles')

  const typeTabs = useMemo(() => {
    const tabs = [] as TabItem<(typeof ArticleType)[keyof typeof ArticleType]>[]
    Object.values(ArticleType).forEach((type) =>
      tabs.push({ value: type, content: t(type) })
    )
    return tabs
  }, [t])

  return (
    <Tabs
      className={classNames('', {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onChangeTab}
    />
  )
}
