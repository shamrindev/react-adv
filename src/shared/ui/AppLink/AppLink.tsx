import { AppLinkProps } from './AppLink.types'
import { AppLink as AppLinkRedesigned } from './redesigned/AppLink'

export const AppLink = (props: AppLinkProps) => <AppLinkRedesigned {...props} />
