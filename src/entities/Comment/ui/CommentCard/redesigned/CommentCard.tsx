import { useTranslation } from 'react-i18next'
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'
import { Skeleton } from '@/shared/ui/Skeleton'
import { AppLink } from '@/shared/ui/AppLink'
import { HStack, VStack } from '@/shared/ui/Stack'
import { getRouteProfile } from '@/shared/const/router'
import { CommentCardProps } from '../CommentCard.types'
import cls from './CommentCard.module.scss'

export const CommentCard = ({
  className,
  comment,
  isLoading,
}: CommentCardProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack
        data-testid={'CommentCard.Loading'}
        gap="16"
        max
        className={classNames(cls.commentCard, {}, [className, cls.loading])}
      >
        <VStack gap="8">
          <Skeleton width={30} height={30} border={'50%'} />
          <Skeleton className={cls.username} width={100} height={16} />
        </VStack>
        <Skeleton className={cls.text} width={'100%'} height={50} />
      </VStack>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <HStack
      max
      align="start"
      gap="8"
      className={classNames(cls.commentCard, {}, [className])}
    >
      <AppLink to={getRouteProfile(comment.user.id)} className={cls.avatarLink}>
        {comment.user.avatar ? (
          <Avatar size={28} src={comment.user.avatar} />
        ) : (
          <div className={cls.avatarFallback} />
        )}
      </AppLink>

      <VStack gap="4" max className={cls.body}>
        <HStack gap="4" align="center" className={cls.meta}>
          <AppLink to={getRouteProfile(comment.user.id)}>
            <Text
              className={cls.username}
              text={`u/${comment.user.username}`}
            />
          </AppLink>
        </HStack>

        <Text className={cls.text} text={comment.text} />

        <HStack gap="8" align="center" className={cls.actions}>
          <HStack gap="4" align="center" className={cls.vote}>
            <Icon
              Svg={ArrowUpIcon}
              width={16}
              height={16}
              className={cls.upIcon}
            />
            <span className={cls.voteCount}>0</span>
            <Icon
              Svg={ArrowDownIcon}
              width={16}
              height={16}
              className={cls.downIcon}
            />
          </HStack>
          <span className={cls.dot}>·</span>
          <span className={cls.reply}>{t('Ответить')}</span>
        </HStack>
      </VStack>
    </HStack>
  )
}
