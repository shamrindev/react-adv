import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditPage.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/widgets/Page/Page'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import { getRouteArticles } from '@/shared/const/router'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const title = isEdit
    ? t('Редактирование статьи с  ID = ') + id
    : t('Создание новой статьи')

  return (
    <Page className={classNames(cls.articleeditpage, {}, [className])}>
      <VStack gap="16" align="center" max className={cls.empty}>
        <Icon Svg={ArticleIcon} width={48} height={48} className={cls.icon} />
        <Text title={title} />
        <Text text={t('Редактор статей в разработке')} className={cls.muted} />
        <Button onClick={() => navigate(getRouteArticles())}>
          {t('Назад к списку')}
        </Button>
      </VStack>
    </Page>
  )
}
export default ArticleEditPage
