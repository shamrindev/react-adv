import { FeatureFlags } from '@/shared/types/featureFlags'

function readInitial(): FeatureFlags {
  try {
    return {
      // the modern Reddit-style UI is the default; the legacy design stays
      // available via the toggle in Settings (which persists this key)
      isAppRedesigned: JSON.parse(
        localStorage.getItem('isAppRedesigned') || 'true'
      ),
    }
  } catch {
    return { isAppRedesigned: true }
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
