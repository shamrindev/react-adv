import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import { classNames } from '@/shared/lib/classNames/classNames'
import SunIcon from '@/shared/assets/icons/sun.svg'
import MoonIcon from '@/shared/assets/icons/moon.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    const { t } = useTranslation()
    const isDark = theme === Theme.DARK

    return (
      <Button
        onClick={toggleTheme}
        theme={ButtonTheme.CLEAR}
        square
        size={ButtonSize.XL}
        className={classNames('', {}, [className])}
        aria-label={t('Сменить тему')}
        title={isDark ? t('Светлая тема') : t('Тёмная тема')}
      >
        {isDark ? (
          <SunIcon width={22} height={22} />
        ) : (
          <MoonIcon width={22} height={22} />
        )}
      </Button>
    )
  }
)
