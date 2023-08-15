import { AvatarProps } from './Avatar.types'
import { Avatar as AvatarRedesigned } from './redesigned/Avatar'

export type { AvatarProps } from './Avatar.types'

export const Avatar = (props: AvatarProps) => <AvatarRedesigned {...props} />
