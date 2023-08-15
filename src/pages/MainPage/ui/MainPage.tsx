import { memo } from 'react'
import { useSelector } from 'react-redux'

import GitHubIcon from '@/shared/assets/icons/github-octocat.svg'
import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { StickyContentLayout } from '@/shared/layouts'
import { getRouteArticles } from '@/shared/const/router'
import {
  ArticleList,
  ArticleView,
  ARTICLE_COMMUNITIES,
} from '@/entities/Article'
import { getUserAuthData } from '@/entities/User'
import { Page } from '@/widgets/Page'
import { useTranslation } from 'react-i18next'
import { useLatestArticles } from '../model/useLatestArticles'
import cls from './MainPage.module.scss'

const MainPage = memo(() => {
  const { t } = useTranslation('main')
  const authData = useSelector(getUserAuthData)
  const { articles, isLoading, error } = useLatestArticles(6)

  return (
    <Page data-testid="MainPage">
      <StickyContentLayout
        content={
          <VStack gap="16" max className={cls.content}>
            {!authData && (
              <div className={cls.hero}>
                <Text
                  title={t('Лента вашего IT-сообщества')}
                  size={TextSize.L}
                  className={cls.heroTitle}
                />
                <Text
                  text={t(
                    'Читайте, обсуждайте и голосуйте за статьи об IT, науке и не только'
                  )}
                  className={cls.heroSubtitle}
                />
                <AppLink to={getRouteArticles()}>
                  <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    size={ButtonSize.L}
                  >
                    {t('Перейти к статьям')}
                  </Button>
                </AppLink>
              </div>
            )}

            <Text title={t('Популярные статьи')} className={cls.sectionTitle} />
            <ArticleList
              articles={articles}
              isLoading={isLoading}
              error={error}
              view={ArticleView.SMALL}
            />
            <AppLink to={getRouteArticles()} className={cls.viewAll}>
              {t('Смотреть все статьи')}
            </AppLink>

            <Text
              title={t('Популярные сообщества')}
              className={cls.sectionTitle}
            />
            <div className={cls.communities}>
              {ARTICLE_COMMUNITIES.map((c) => (
                <AppLink
                  key={c.name}
                  to={`${getRouteArticles()}?type=${encodeURIComponent(
                    c.name
                  )}`}
                  className={cls.communityCard}
                >
                  <span
                    className={cls.commDot}
                    style={{ backgroundColor: c.color }}
                  />
                  <VStack gap="4">
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <span className={cls.commName}>r/{c.name}</span>
                    <Text text={t(c.desc)} className={cls.muted} />
                  </VStack>
                </AppLink>
              ))}
            </div>
          </VStack>
        }
        right={
          <VStack gap="16" max>
            <Card className={cls.railCard}>
              <VStack gap="8">
                <Text title={t('О проекте')} />
                <Text text={t('Описание')} className={cls.muted} />
              </VStack>
            </Card>
            {!authData && (
              <Card className={cls.railCard}>
                <VStack gap="8">
                  <Text title={t('Демо-доступ')} />
                  <Text
                    text={t(
                      'admin / 123 — администратор · user / 123 — пользователь'
                    )}
                    className={cls.muted}
                  />
                  <HStack gap="16" className={cls.railLinks}>
                    <a
                      href="https://github.com/Ch4m4/react-adv"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <GitHubIcon width={26} height={26} />
                    </a>
                  </HStack>
                </VStack>
              </Card>
            )}
          </VStack>
        }
      />
    </Page>
  )
})
export default MainPage
