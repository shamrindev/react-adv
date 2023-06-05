import { setFeatureFlags, toggleFeatures } from '..'

describe('toggleFeatures', () => {
  test('calls on() when flag enabled', () => {
    setFeatureFlags({ isAppRedesigned: true })
    expect(toggleFeatures({ name: 'isAppRedesigned', on: () => 'new', off: () => 'old' })).toBe('new')
  })
  test('calls off() when flag disabled', () => {
    setFeatureFlags({ isAppRedesigned: false })
    expect(toggleFeatures({ name: 'isAppRedesigned', on: () => 'new', off: () => 'old' })).toBe('old')
  })
})
