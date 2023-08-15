import { DropdownDirection } from '@/shared/types'
import { AvatarDropdown as AvatarDropdownRedesigned } from './redesigned/AvatarDropdown'

interface AvatarDropdownProps {
  className?: string
  dropdownDirection?: DropdownDirection
}

export const AvatarDropdown = (props: AvatarDropdownProps) => (
  <AvatarDropdownRedesigned {...props} />
)
