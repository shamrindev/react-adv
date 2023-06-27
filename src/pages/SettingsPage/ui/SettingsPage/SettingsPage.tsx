import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher'
import { Text } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page/Page'
import cls from './SettingsPage.module.scss'

interface SettingsPageProps {
  className?: string
}

const SettingsPage = memo(({ className }: SettingsPageProps) => {
  const { t } = useTranslation()

  return (
    <Page
      data-testid="SettingsPage"
      className={classNames(cls.SettingsPage, {}, [className])}
    >
      <VStack gap="16" max>
        <Text title={t('Настройки')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  )
})

export default SettingsPage
