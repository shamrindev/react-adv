import { SkeletonProps } from './Skeleton.types'
import { Skeleton as SkeletonRedesigned } from './redesigned/Skeleton'

export type { SkeletonProps } from './Skeleton.types'

export const Skeleton = (props: SkeletonProps) => (
  <SkeletonRedesigned {...props} />
)
