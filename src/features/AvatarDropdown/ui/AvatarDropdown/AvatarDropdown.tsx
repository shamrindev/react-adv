import { toggleFeatures } from '@/shared/lib/features'
import { DropdownDirection } from '@/shared/types'
import { AvatarDropdown as AvatarDropdownDeprecated } from './deprecated/AvatarDropdown'
import { AvatarDropdown as AvatarDropdownRedesigned } from './redesigned/AvatarDropdown'

interface AvatarDropdownProps {
  className?: string
  dropdownDirection?: DropdownDirection
}

export const AvatarDropdown = (props: AvatarDropdownProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <AvatarDropdownRedesigned {...props} />,
    off: () => <AvatarDropdownDeprecated {...props} />,
  })
