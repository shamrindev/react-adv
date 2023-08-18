import { LoginModal, useLoginModal } from '@/features/AuthByUserName'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { NotificationButton } from '@/features/NotificationButton'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { getUserAuthData } from '@/entities/User'
import { getRouteArticleCreate, getRouteArticles } from '@/shared/const/router'
import SearchIcon from '@/shared/assets/icons/search.svg'
import BurgerIcon from '@/shared/assets/icons/burger.svg'
import cls from './Navbar.module.scss'

export interface NavbarProps {
  className?: string
  /** opens the mobile off-canvas sidebar */
  onOpenSidebar?: () => void
}

export const Navbar = memo(({ className, onOpenSidebar }: NavbarProps) => {
  const { t } = useTranslation('translation')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    isOpen: isAuthModal,
    open: onShowModal,
    close: onCloseModal,
  } = useLoginModal()
  const [search, setSearch] = useState('')
  const authData = useSelector(getUserAuthData)

  const onSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const params = new URLSearchParams()
      const query = search.trim()
      if (query) params.set('search', query)
      // keep the active community filter so searching from a filtered feed
      // doesn't silently drop it
      const type = searchParams.get('type')
      if (type) params.set('type', type)
      const qs = params.toString()
      navigate(qs ? `${getRouteArticles()}?${qs}` : getRouteArticles())
    },
    [navigate, search, searchParams]
  )

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <HStack gap="8" align="center" className={cls.left}>
        <button
          type="button"
          className={cls.burger}
          onClick={onOpenSidebar}
          aria-label={t('Меню')}
        >
          <Icon Svg={BurgerIcon} width={24} height={24} />
        </button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <span className={cls.logo}>artHub</span>
      </HStack>

      <form
        className={cls.searchWrapper}
        role="search"
        onSubmit={onSearchSubmit}
      >
        <Icon
          Svg={SearchIcon}
          width={18}
          height={18}
          className={cls.searchIcon}
        />
        <Input
          className={cls.search}
          value={search}
          onChange={setSearch}
          placeholder={t('Поиск статей')}
          aria-label={t('Поиск статей')}
        />
        {/* no submit button needed — a single-input form submits on Enter,
            handled by the form's onSubmit */}
      </form>

      {authData ? (
        <HStack gap="16" align="center" className={cls.actions}>
          <AppLink to={getRouteArticleCreate()}>
            <Button
              theme={ButtonTheme.BACKGROUND_INVERTED}
              className={cls.createBtn}
            >
              {t('Создать')}
            </Button>
          </AppLink>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      ) : (
        <HStack gap="16" align="center" className={cls.actions}>
          <Button theme={ButtonTheme.BACKGROUND_INVERTED} onClick={onShowModal}>
            {t('Войти')}
          </Button>
          {isAuthModal && (
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
          )}
        </HStack>
      )}
    </header>
  )
})
