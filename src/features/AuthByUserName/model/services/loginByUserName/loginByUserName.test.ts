import { userActions } from '@/entities/User'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUserName } from './loginByUserName'

describe('loginByUsername.test', () => {
  test('success login strips the password before persisting', async () => {
    // the mock API echoes the stored record back, password included
    const apiUser = { username: '123', id: '1', password: 'secret' }
    const safeUser = { username: '123', id: '1' }
    const setItem = jest.spyOn(Storage.prototype, 'setItem')

    const thunk = new TestAsyncThunk(loginByUserName)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: apiUser }))
    const result = await thunk.callThunk({ username: '123', password: 'secret' })

    // neither Redux nor localStorage should ever receive the password
    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(safeUser)
    )
    expect(setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(safeUser)
    )
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(safeUser)
    expect(
      (result.payload as { password?: string }).password
    ).toBeUndefined()

    setItem.mockRestore()
  })

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUserName)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: '123', password: '123' })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
