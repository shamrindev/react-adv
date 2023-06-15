import { classNames } from '@/shared/lib/classNames/classNames'
import { CSSProperties } from 'react'
import { SkeletonProps } from '../Skeleton.types'
import cls from './Skeleton.module.scss'

export const Skeleton = ({
  className,
  height,
  width,
  border,
}: SkeletonProps) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }
  return (
    <div
      className={classNames(cls.skeleton, {}, [className])}
      style={styles}
    ></div>
  )
}
