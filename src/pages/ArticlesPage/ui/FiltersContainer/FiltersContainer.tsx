import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import cls from './FiltersContainer.module.scss'

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const { t } = useTranslation('articles')

  return (
    <VStack gap={'16'} max className={className}>
      <Card className={cls.card}>
        <Text title={t('Фильтры')} />
        <ArticlesPageFilters />
      </Card>
      <Card className={cls.card}>
        <Text title={t('О сообществе')} />
        <Text
          className={cls.muted}
          text={t('Сообщество разработчиков и читателей')}
        />
        <Text
          className={cls.muted}
          text={t('Делитесь статьями, обсуждайте и голосуйте')}
        />
      </Card>
    </VStack>
  )
})
