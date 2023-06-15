import { classNames } from '@/shared/lib/classNames/classNames'
import { useCallback } from 'react'
import { Card, CardTheme } from '../../Card/Card'
import { TabItem, TabsProps } from '../Tabs.types'
import cls from './Tabs.module.scss'

export const Tabs = <T extends string>({
  className,
  tabs,
  value,
  onTabClick,
}: TabsProps<T>) => {
  const onClickHandler = useCallback(
    (tab: TabItem<T>) => () => onTabClick(tab),
    [onTabClick]
  )

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={cls.tab}
          onClick={onClickHandler(tab)}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
}
