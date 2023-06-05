import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from './setGetFeatures'

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags
  on: () => T
  off: () => T
}

export function toggleFeatures<T>({ name, on, off }: ToggleFeaturesOptions<T>): T {
  return getFeatureFlag(name) ? on() : off()
}
