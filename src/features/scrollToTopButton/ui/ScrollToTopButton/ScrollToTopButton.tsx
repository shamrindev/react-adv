import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg'
import cls from './ScrollToTopButton.module.scss'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo(
  ({ className }: ScrollToTopButtonProps) => {
    const { t } = useTranslation()
    const onClick = useCallback(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={t('Наверх')}
        className={classNames(cls.scrollToTopButton, {}, [className])}
      >
        <Icon Svg={ArrowUpIcon} width={20} height={20} className={cls.icon} />
      </button>
    )
  }
)
