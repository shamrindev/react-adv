import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { saveJsonSettings } from './saveJsonSettings'
import { JsonSettings } from '../../types/jsonSettings'

const userData = {
  id: '1',
  username: 'admin',
}

const jsonSettings: JsonSettings = {
  isFirstVisit: true,
  settingsPageHasBeenOpen: false,
}

describe('saveJsonSettings.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, {
      user: { authData: userData },
    })
    thunk.api.put.mockReturnValue(
      Promise.resolve({ data: { ...userData, jsonSettings } })
    )
    const result = await thunk.callThunk(jsonSettings)
    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(jsonSettings)
  })

  test('error (no auth data)', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, {})
    const result = await thunk.callThunk(jsonSettings)
    expect(thunk.api.put).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
  })
})
