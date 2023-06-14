import { CSSProperties, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { AppImage } from '../../AppImage'
import { Icon } from '../../Icon'
import defaultIcon from '../../../assets/icons/user-filled.svg'
import { Skeleton } from '../../Skeleton'
import { AvatarProps } from '../Avatar.types'

export const Avatar = ({
  className,
  src,
  size = 100,
  alt = 'avatar',
  fallbackInverted = false,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  )
  const fallback = <Skeleton width={size} height={size} border="50%" />
  const errorFallback = (
    <Icon
      Svg={defaultIcon}
      width={size}
      height={size}
      inverted={fallbackInverted}
    />
  )

  return (
    <AppImage
      style={styles}
      src={src}
      alt={alt}
      className={classNames(cls.avatar, {}, [className])}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  )
}
