import { CountrySelect } from '../../../../Country'
import { CurrencySelect } from '../../../../Currency'
import { useTranslation } from 'react-i18next'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Input } from '@/shared/ui/Input'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text'
import cls from './ProfileCard.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack'
import { ProfileCardProps } from '../ProfileCard.types'

export const ProfileCard = ({
  className,
  data,
  isLoading,
  error,
  readonly,
  onChangeFirstName,
  onChangeLastName,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry,
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.profilecard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <HStack justify="center" max>
          <Skeleton border="50%" width={120} height={120} />
        </HStack>
        <Skeleton width="100%" height={38} border="8px" />
        <Skeleton width="100%" height={38} border="8px" />
        <Skeleton width="100%" height={38} border="8px" />
        <Skeleton width="100%" height={38} border="8px" />
      </VStack>
    )
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.profilecard, {}, [className, cls.error])}
      >
        <Text
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте перезагрузить страницу')}
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.profilecard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar size={120} src={data?.avatar} alt="avatar img" />
        </HStack>
      )}

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Ваше имя')} />
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          readonly={readonly}
          onChange={onChangeFirstName}
          data-testid={'ProfileCard.firstname'}
        />
      </VStack>

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Ваше фамилия')} />
        <Input
          value={data?.lastname}
          placeholder={t('Ваше фамилия')}
          readonly={readonly}
          onChange={onChangeLastName}
          data-testid={'ProfileCard.lastname'}
        />
      </VStack>

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Ваш возраст')} />
        <Input
          value={Number(data?.age) || 0}
          placeholder={t('Ваш возраст')}
          readonly={readonly}
          onChange={onChangeAge}
        />
      </VStack>

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Город')} />
        <Input
          value={data?.city}
          placeholder={t('Город')}
          readonly={readonly}
          onChange={onChangeCity}
        />
      </VStack>

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Имя пользователя')} />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          readonly={readonly}
          onChange={onChangeUsername}
        />
      </VStack>

      <VStack gap="4" max>
        <Text className={cls.label} text={t('Введите ссылку на аватар')} />
        <Input
          value={data?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          readonly={readonly}
          onChange={onChangeAvatar}
        />
      </VStack>

      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  )
}
