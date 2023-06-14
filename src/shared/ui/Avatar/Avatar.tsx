import { toggleFeatures } from '@/shared/lib/features'
import { AvatarProps } from './Avatar.types'
import { Avatar as AvatarDeprecated } from './deprecated/Avatar'
import { Avatar as AvatarRedesigned } from './redesigned/Avatar'

export type { AvatarProps } from './Avatar.types'

export const Avatar = (props: AvatarProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <AvatarRedesigned {...props} />,
    off: () => <AvatarDeprecated {...props} />,
  })
