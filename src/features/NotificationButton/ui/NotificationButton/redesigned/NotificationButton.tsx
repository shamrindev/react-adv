import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'

import { NotificationList } from '@/entities/Notification'
import { Icon } from '@/shared/ui/Icon'
import NotificationsIcon from '@/shared/assets/icons/notification-20-20.svg'
import { Popover } from '@/shared/ui/Popups'
import { BrowserView, MobileView } from 'react-device-detect'
import { Drawer } from '@/shared/ui/Drawer'
import { useCallback, useState } from 'react'

interface NotificationButtonProps {
  triggerClassName?: string
}

export const NotificationButton = ({
  triggerClassName,
}: NotificationButtonProps) => {
  const [open, setOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setOpen(true)
  }, [])
  const onCloseDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  const trigger = (
    <Icon
      Svg={NotificationsIcon}
      clickable
      onClick={onOpenDrawer}
      className={cls.trigger}
    />
  )

  return (
    <>
      <BrowserView>
        <Popover className={triggerClassName} trigger={trigger}>
          <NotificationList
            className={classNames(cls.notificationbutton, {}, [
              cls.notifications,
            ])}
          />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer onClose={onCloseDrawer} isOpen={open}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  )
}
