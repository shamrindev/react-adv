import { toggleFeatures } from '@/shared/lib/features'
import { SkeletonProps } from './Skeleton.types'
import { Skeleton as SkeletonDeprecated } from './deprecated/Skeleton'
import { Skeleton as SkeletonRedesigned } from './redesigned/Skeleton'

export type { SkeletonProps } from './Skeleton.types'

export const Skeleton = (props: SkeletonProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <SkeletonRedesigned {...props} />,
    off: () => <SkeletonDeprecated {...props} />,
  })
