import { TabsProps } from './Tabs.types'
import { Tabs as TabsRedesigned } from './redesigned/Tabs'

export type { TabItem, TabsProps } from './Tabs.types'

export const Tabs = <T extends string>(props: TabsProps<T>) => (
  <TabsRedesigned {...props} />
)
