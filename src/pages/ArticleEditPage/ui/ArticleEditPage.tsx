import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { $api } from '@/shared/api/api'
import { getUserAuthData } from '@/entities/User'
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article'
import { getRouteArticleDetails, getRouteArticles } from '@/shared/const/router'
import { Page } from '@/widgets/Page'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Card } from '@/shared/ui/Card'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
  className?: string
}

const COMMUNITY_OPTIONS = [
  ArticleType.IT,
  ArticleType.AI,
  ArticleType.WEB_DEV,
  ArticleType.DATA_SCIENCE,
  ArticleType.DESIGN,
  ArticleType.CYBERSECURITY,
  ArticleType.BLOCKCHAIN,
  ArticleType.MOBILE_DEV,
]

const formatToday = () => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

// small unique id for the new article / its blocks (avoids pulling in a
// dependency just for an id on a mock backend)
const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const authData = useSelector(getUserAuthData)
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [img, setImg] = useState('')
  const [type, setType] = useState<ArticleType>(ArticleType.IT)
  const [body, setBody] = useState('')
  const [views, setViews] = useState(0)
  const [createdAt, setCreatedAt] = useState('')
  // preserve the original author on edit instead of reassigning to the editor
  const [authorId, setAuthorId] = useState<string>()

  const [isLoading, setIsLoading] = useState(isEdit)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string>()

  // edit mode: load the existing article and prefill the form
  useEffect(() => {
    if (!isEdit || !id) return
    let active = true
    setIsLoading(true)
    $api
      .get<Article>(`/articles/${id}`)
      .then((res) => {
        if (!active) return
        const a = res.data
        setTitle(a.title ?? '')
        setSubtitle(a.subtitle ?? '')
        setImg(a.img ?? '')
        setType(a.type?.[0] ?? ArticleType.IT)
        setViews(a.views ?? 0)
        setCreatedAt(a.createdAt ?? '')
        setAuthorId(a.userId ?? a.user?.id)
        const textBlock = a.blocks?.find(
          (b) => b.type === ArticleBlockType.TEXT
        )
        if (textBlock && 'paragraphs' in textBlock) {
          setBody(textBlock.paragraphs.join('\n'))
        }
      })
      .catch(() => {
        if (active) setError(t('Не удалось загрузить статью'))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [id, isEdit, t])

  const onSave = useCallback(async () => {
    if (!title.trim()) {
      setError(t('Заголовок обязателен'))
      return
    }
    setError(undefined)
    setIsSaving(true)

    const paragraphs = body
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean)

    const articleId = isEdit && id ? id : genId()
    const payload: Article = {
      id: articleId,
      title: title.trim(),
      subtitle: subtitle.trim(),
      img: img.trim(),
      views: isEdit ? views : 0,
      createdAt: isEdit ? createdAt : formatToday(),
      // keep the original author when editing; only a new article is owned by
      // the current user.
      userId: isEdit ? authorId : authData?.id,
      type: [type],
      // no block `title` here: the subtitle is already rendered by the details
      // header, so repeating it as a block heading would duplicate it.
      blocks: paragraphs.length
        ? [
            {
              id: genId(),
              type: ArticleBlockType.TEXT,
              paragraphs,
            },
          ]
        : [],
    } as Article

    try {
      if (isEdit) {
        await $api.put(`/articles/${articleId}`, payload)
      } else {
        await $api.post('/articles', payload)
      }
      navigate(getRouteArticleDetails(articleId))
    } catch {
      setError(t('Не удалось сохранить статью'))
    } finally {
      setIsSaving(false)
    }
  }, [
    title,
    subtitle,
    img,
    body,
    type,
    views,
    createdAt,
    authorId,
    isEdit,
    id,
    authData?.id,
    navigate,
    t,
  ])

  const pageTitle = isEdit
    ? t('Редактирование статьи')
    : t('Создание новой статьи')

  return (
    <Page className={classNames(cls.articleeditpage, {}, [className])}>
      <VStack gap="16" max className={cls.wrapper}>
        <Text title={pageTitle} className={cls.pageTitle} />

        <Card className={cls.formCard}>
          {isLoading ? (
            <VStack gap="16" max>
              <Skeleton width="100%" height={44} border="10px" />
              <Skeleton width="100%" height={44} border="10px" />
              <Skeleton width="100%" height={160} border="10px" />
            </VStack>
          ) : (
            <VStack gap="16" max>
              <VStack gap="4" max>
                <Text text={t('Заголовок')} className={cls.label} />
                <Input
                  value={title}
                  onChange={setTitle}
                  placeholder={t('Введите заголовок статьи')}
                />
              </VStack>

              <VStack gap="4" max>
                <Text text={t('Подзаголовок')} className={cls.label} />
                <Input
                  value={subtitle}
                  onChange={setSubtitle}
                  placeholder={t('Короткое описание')}
                />
              </VStack>

              <VStack gap="4" max>
                <Text text={t('Ссылка на изображение')} className={cls.label} />
                <Input
                  value={img}
                  onChange={setImg}
                  placeholder="https://..."
                />
              </VStack>

              <VStack gap="4" max>
                <Text text={t('Сообщество')} className={cls.label} />
                <div className={cls.chips}>
                  {COMMUNITY_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={classNames(cls.chip, {
                        [cls.chipActive]: opt === type,
                      })}
                      onClick={() => setType(opt)}
                    >
                      {/* eslint-disable-next-line i18next/no-literal-string */}
                      {`r/${opt}`}
                    </button>
                  ))}
                </div>
              </VStack>

              <VStack gap="4" max>
                <Text text={t('Текст статьи')} className={cls.label} />
                <textarea
                  className={cls.textarea}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={t(
                    'Напишите статью. Новый абзац — с новой строки'
                  )}
                  rows={8}
                />
              </VStack>

              {error && <Text text={error} theme={TextTheme.ERROR} />}

              <HStack gap="16" justify="end" max>
                <Button
                  theme={ButtonTheme.OUTLINE}
                  disabled={isSaving}
                  onClick={() => navigate(getRouteArticles())}
                >
                  {t('Отмена')}
                </Button>
                <Button
                  theme={ButtonTheme.BACKGROUND_INVERTED}
                  disabled={isSaving}
                  onClick={onSave}
                >
                  {isEdit ? t('Сохранить') : t('Опубликовать')}
                </Button>
              </HStack>
            </VStack>
          )}
        </Card>
      </VStack>
    </Page>
  )
}
export default ArticleEditPage
