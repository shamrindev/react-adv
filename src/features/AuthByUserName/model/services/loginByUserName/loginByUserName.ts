import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { User, userActions } from '@/entities/User'
interface LoginByUserNameProps {
  username: string
  password: string
}
export const loginByUserName = createAsyncThunk<
  User,
  LoginByUserNameProps,
  ThunkConfig<string>
>('login/loginByUserName', async ({ username, password }, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.post<User>('/login', {
      username,
      password,
    })
    if (!res.data) {
      throw new Error()
    }
    // the mock API echoes back the stored record including the plaintext
    // password — never persist that. Keep only the safe user fields.
    const safeUser = { ...res.data } as User & { password?: string }
    delete safeUser.password
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(safeUser))
    dispatch(userActions.setAuthData(safeUser))

    return safeUser
  } catch (e) {
    console.error(e)
    return rejectWithValue('error')
  }
})
