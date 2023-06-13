import { toggleFeatures } from '@/shared/lib/features'
import { TextProps } from './Text.types'
import { Text as TextDeprecated } from './deprecated/Text'
import { Text as TextRedesigned } from './redesigned/Text'

export const Text = (props: TextProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <TextRedesigned {...props} />,
    off: () => <TextDeprecated {...props} />,
  })
