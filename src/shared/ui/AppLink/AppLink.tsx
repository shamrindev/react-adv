import { toggleFeatures } from '@/shared/lib/features'
import { AppLinkProps } from './AppLink.types'
import { AppLink as AppLinkDeprecated } from './deprecated/AppLink'
import { AppLink as AppLinkRedesigned } from './redesigned/AppLink'

export const AppLink = (props: AppLinkProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <AppLinkRedesigned {...props} />,
    off: () => <AppLinkDeprecated {...props} />,
  })
