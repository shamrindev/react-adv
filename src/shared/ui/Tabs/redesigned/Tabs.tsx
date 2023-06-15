import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { useCallback } from 'react'
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
      {tabs.map((tab) => {
        const mods: Mods = {
          [cls.active]: tab.value === value,
        }

        return (
          <button
            type="button"
            key={tab.value}
            className={classNames(cls.tab, mods, [])}
            onClick={onClickHandler(tab)}
          >
            {tab.content}
          </button>
        )
      })}
    </div>
  )
}
