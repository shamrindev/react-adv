import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { JsonSettings } from '../../types/jsonSettings'
import { getJsonSettings } from '../../selectors/jsonSettings/jsonSettings'
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData'

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI
  const userData = getUserAuthData(getState())
  const currentSettings = getJsonSettings(getState())

  if (!userData) {
    return rejectWithValue('')
  }

  try {
    const response = await extra.api.put(`/users/${userData.id}`, {
      ...userData,
      jsonSettings: {
        ...currentSettings,
        ...newJsonSettings,
      },
    })

    if (!response.data) {
      return rejectWithValue('')
    }

    return response.data.jsonSettings
  } catch (e) {
    return rejectWithValue('')
  }
})
