import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { DropdownDirection } from '@/shared/types'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router'

interface AvatarDropdownProps {
  className?: string
  dropdownDirection?: DropdownDirection
}

export const AvatarDropdown = ({
  className,
  dropdownDirection = 'bottom left',
}: AvatarDropdownProps) => {
  const { t, i18n } = useTranslation('translation')

  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const isAdminPanelAvaliable = isAdmin || isManager
  const dispatch = useDispatch()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === Theme.DARK

  const onLogout = () => {
    dispatch(userActions.logout())
  }

  const onToggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  if (!authData) return null

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction={dropdownDirection}
      items={[
        {
          content: t('PROFILE_PAGE'),
          href: getRouteProfile(authData.id),
        },
        ...(isAdminPanelAvaliable
          ? [
              {
                content: t('админ_панель'),
                href: getRouteAdmin(),
              },
            ]
          : []),
        // account preferences moved here (no separate Settings page)
        {
          content: isDark ? t('Светлая тема') : t('Тёмная тема'),
          onClick: toggleTheme,
        },
        { content: t('Сменить язык'), onClick: onToggleLang },
        { content: t('Выйти'), onClick: onLogout },
      ]}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
    />
  )
}
