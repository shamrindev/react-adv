import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  getFeatureFlag,
  getAllFeatureFlags,
  setFeatureFlags,
} from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { saveJsonSettings } from '@/entities/User'
import { ListBox } from '@/shared/ui/Popups'

interface UiDesignSwitcherProps {
  className?: string
}

export const UiDesignSwitcher = ({ className }: UiDesignSwitcherProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const isAppRedesigned = getFeatureFlag('isAppRedesigned')

  const items = [
    { value: 'new', content: t('Новый') },
    { value: 'old', content: t('Старый') },
  ]

  const onChange = (value: string) => {
    const isNew = value === 'new'
    setIsLoading(true)
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: isNew })
    localStorage.setItem('isAppRedesigned', JSON.stringify(isNew))
    // best-effort backend persist; ignore failure
    dispatch(saveJsonSettings({})).finally(() => {
      window.location.reload()
    })
  }

  return (
    <ListBox
      className={classNames('', {}, [className])}
      onChange={onChange}
      value={isAppRedesigned ? 'new' : 'old'}
      items={items}
      readonly={isLoading}
      label={t('Тема оформления интерфейса') ?? ''}
    />
  )
}
