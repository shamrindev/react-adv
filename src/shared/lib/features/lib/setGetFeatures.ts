import { FeatureFlags } from '@/shared/types/featureFlags'

let featureFlags: FeatureFlags = { isAppRedesigned: false }

export function setFeatureFlags(newFlags?: FeatureFlags) {
  if (newFlags) {
    featureFlags = newFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag]
}

export function getAllFeatureFlags() {
  return featureFlags
}
