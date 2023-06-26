import { toggleFeatures } from '@/shared/lib/features'
import { ProfileCardProps } from './ProfileCard.types'
import { ProfileCard as ProfileCardDeprecated } from './deprecated/ProfileCard'
import { ProfileCard as ProfileCardRedesigned } from './redesigned/ProfileCard'

export type { ProfileCardProps } from './ProfileCard.types'

export const ProfileCard = (props: ProfileCardProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ProfileCardRedesigned {...props} />,
    off: () => <ProfileCardDeprecated {...props} />,
  })
