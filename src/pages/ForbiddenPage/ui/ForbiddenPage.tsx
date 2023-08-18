import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteMain } from '@/shared/const/router'
import cls from './ForbiddenPage.module.scss'

interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation()

  return (
    <Page data-testid="ForbiddenPage" className={className}>
      <div className={classNames(cls.ForbiddenPage, {}, [])}>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <span className={cls.code}>403</span>
        <span className={cls.message}>{t('нет_прав')}</span>
        <AppLink to={getRouteMain()} className={cls.homeLink}>
          {t('Главная')}
        </AppLink>
      </div>
    </Page>
  )
}
export default ForbiddenPage
