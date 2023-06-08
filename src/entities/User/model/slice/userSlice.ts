import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setFeatureFlags } from '@/shared/lib/features'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { User, UserSchema } from '../types/user'
import { JsonSettings } from '../types/jsonSettings'
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings'

const initialState: UserSchema = {
  _inited: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    setJsonSettings: (state, action: PayloadAction<JsonSettings>) => {
      if (state.authData) {
        state.authData.jsonSettings = action.payload
      }
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        const json = JSON.parse(user) as User
        state.authData = json
        setFeatureFlags(json.features)
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveJsonSettings.fulfilled, (state, action) => {
      if (state.authData) {
        state.authData.jsonSettings = action.payload
      }
    })
  },
})
export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
