import { toggleFeatures } from '@/shared/lib/features'
import { Navbar as NavbarDeprecated, NavbarProps } from './deprecated/Navbar'
import { Navbar as NavbarRedesigned } from './redesigned/Navbar'

export const Navbar = (props: NavbarProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <NavbarRedesigned {...props} />,
    off: () => <NavbarDeprecated {...props} />,
  })
