import { ProfileCardProps } from './ProfileCard.types'
import { ProfileCard as ProfileCardRedesigned } from './redesigned/ProfileCard'

export type { ProfileCardProps } from './ProfileCard.types'

export const ProfileCard = (props: ProfileCardProps) => (
  <ProfileCardRedesigned {...props} />
)
