import { memo } from 'react'

import GitHubIcon from '@/shared/assets/icons/github-octocat.svg'
import StorybookIcon from '@/shared/assets/icons/storybook-icon.svg'
import { toggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { StickyContentLayout } from '@/shared/layouts'
import { getRouteArticles } from '@/shared/const/router'
import { Page } from '@/widgets/Page/Page'
import { useTranslation } from 'react-i18next'
import cls from './MainPage.module.scss'

const communities = [
  {
    name: 'IT',
    color: 'var(--accent-up)',
    desc: 'Программирование и разработка',
  },
  {
    name: 'SCIENCE',
    color: 'var(--accent-down)',
    desc: 'Исследования и открытия',
  },
  {
    name: 'ECONOMICS',
    color: 'var(--accent-positive)',
    desc: 'Рынки и финансы',
  },
]
const MainPage = memo(() => {
  const { t } = useTranslation('main')

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Page data-testid="MainPage">
        <StickyContentLayout
          content={
            <VStack gap="16" max>
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

              <Text
                title={t('Популярные сообщества')}
                className={cls.sectionTitle}
              />
              <div className={cls.communities}>
                {communities.map((c) => (
                  <AppLink
                    key={c.name}
                    to={getRouteArticles()}
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
            </VStack>
          }
        />
      </Page>
    ),
    off: () => (
      <Page data-testid="MainPage">
        <div className={cls.mainDescription}>
          <h2>{t('Полезные статьи на тему IT и не только')}</h2>
          <p>{t(`Описание`)}</p>
          <h3>{t('Учетные записи для тестирования функционала')}</h3>
          <ul>
            <li>
              <strong>{t('Администратор')}</strong>{' '}
              {t('(функционал в разработке) логин: admin, пароль: 123')}
            </li>
            <li>
              <strong>{t('Пользователь')}</strong>{' '}
              {t('логин: user, пароль: 123')}
            </li>
          </ul>

          <h3>{t('Особенности проекта')}</h3>
          <ul>
            <li>
              {' '}
              <strong>{t('Стэк')}</strong>{' '}
              {t('React, Redux Toolkit, Typescript, RTK Query')}
            </li>
            <li>
              <strong>{t('Сборщик')}</strong>{' '}
              {t('Webpack, конфиг написан вручную')}
            </li>
            <li>
              <strong>{t('Архитектура')}</strong> {t('Feature sliced design')}
            </li>
            <li>
              <span className={cls.testsTitle}>{t('Тесты')}</span>
              <span className={cls.testItem}>
                {t('Обычные unit тесты на Jest')}
              </span>
              <span className={cls.testItem}>
                {t('Тесты на компоненты с React Testing Library')}
              </span>
              <span className={cls.testItem}>
                {t('Скриншотное тестирование с Loki')}
              </span>
              <span className={cls.testItem}>
                {t('E2E тестирование с Cypress')}
              </span>
            </li>
          </ul>

          <div className={cls.links}>
            <a href="https://github.com/Ch4m4/react-adv">
              <span>{t('Ссылка на сторибук основных компонентов')}</span>
              <StorybookIcon width={50} height={50} />
            </a>
            <a href="https://github.com/Ch4m4/react-adv">
              <span>{t('Ссылка на Git репозиторий')}</span>
              <GitHubIcon width={50} height={50} />
            </a>
          </div>
        </div>
      </Page>
    ),
  })
})
export default MainPage
