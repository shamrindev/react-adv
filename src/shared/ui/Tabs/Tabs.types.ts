import { ReactNode } from 'react'

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
}

export interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
  onTabClick: (value: TabItem<T>) => void
}
