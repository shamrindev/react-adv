import { toggleFeatures } from '@/shared/lib/features'
import { NotificationButton as NotificationButtonDeprecated } from './deprecated/NotificationButton'
import { NotificationButton as NotificationButtonRedesigned } from './redesigned/NotificationButton'

interface NotificationButtonProps {
  triggerClassName?: string
}

export const NotificationButton = (props: NotificationButtonProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <NotificationButtonRedesigned {...props} />,
    off: () => <NotificationButtonDeprecated {...props} />,
  })
