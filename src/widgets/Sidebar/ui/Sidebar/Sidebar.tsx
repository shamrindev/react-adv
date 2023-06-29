import { toggleFeatures } from '@/shared/lib/features'
import {
  Sidebar as SidebarDeprecated,
  SidebarProps,
} from './deprecated/Sidebar'
import { Sidebar as SidebarRedesigned } from './redesigned/Sidebar'

export const Sidebar = (props: SidebarProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <SidebarRedesigned {...props} />,
    off: () => <SidebarDeprecated {...props} />,
  })
