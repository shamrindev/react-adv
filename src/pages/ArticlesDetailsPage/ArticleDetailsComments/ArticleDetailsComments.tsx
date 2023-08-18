import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/AddNewComment'
import { LoginModal, useLoginModal } from '@/features/AuthByUserName'
import { TextSize, Text } from '@/shared/ui/Text'
import { Suspense, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../model/selectors/comments'
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../model/slices/ArticleDetailsCommentsSlice'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId'
import { VStack } from '@/shared/ui/Stack'
import { Loader } from '@/shared/ui/Loader'
import { getUserAuthData } from '@/entities/User'
import cls from './ArticleDetailsComments.module.scss'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments = ({
  className,
  id,
}: ArticleDetailsCommentsProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const authData = useSelector(getUserAuthData)
  const {
    isOpen: isAuthModal,
    open: onShowModal,
    close: onCloseModal,
  } = useLoginModal()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  return (
    <VStack
      data-testid={'RatingCard'}
      gap="16"
      max
      className={classNames('', {}, [className])}
    >
      <Text size={TextSize.L} title={t('Комментарии')} />
      {authData ? (
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
      ) : (
        <button type="button" className={cls.loginPrompt} onClick={onShowModal}>
          <span className={cls.signIn}>{t('Войти')}</span>{' '}
          {t('чтобы оставить комментарий')}
        </button>
      )}
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </VStack>
  )
}
