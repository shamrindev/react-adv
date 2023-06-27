import { FeatureFlags } from '@/shared/types/featureFlags'

function readInitial(): FeatureFlags {
  try {
    return {
      isAppRedesigned: JSON.parse(
        localStorage.getItem('isAppRedesigned') || 'false'
      ),
    }
  } catch {
    return { isAppRedesigned: false }
  }
}

let featureFlags: FeatureFlags = readInitial()

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
