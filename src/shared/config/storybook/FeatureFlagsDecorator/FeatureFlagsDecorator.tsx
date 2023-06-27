import { Story, StoryContext } from '@storybook/react'
import { setFeatureFlags } from '@/shared/lib/features'

export const FeatureFlagsDecorator = (
  StoryComponent: Story,
  context: StoryContext
) => {
  setFeatureFlags(context?.parameters?.features ?? {})

  return <StoryComponent />
}
