import { toggleFeatures } from '@/shared/lib/features'
import { TabsProps } from './Tabs.types'
import { Tabs as TabsDeprecated } from './deprecated/Tabs'
import { Tabs as TabsRedesigned } from './redesigned/Tabs'

export type { TabItem, TabsProps } from './Tabs.types'

export const Tabs = <T extends string>(props: TabsProps<T>) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <TabsRedesigned {...props} />,
    off: () => <TabsDeprecated {...props} />,
  })
