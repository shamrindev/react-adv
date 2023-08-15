import { NotificationButton as NotificationButtonRedesigned } from './redesigned/NotificationButton'

interface NotificationButtonProps {
  triggerClassName?: string
}

export const NotificationButton = (props: NotificationButtonProps) => (
  <NotificationButtonRedesigned {...props} />
)
