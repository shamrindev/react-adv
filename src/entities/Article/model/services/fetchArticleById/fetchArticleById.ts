import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '../../types/article'

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchProfileData', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    // storybook case: no id passed, so the thunk is not needed
    if (!articleId) {
      throw new Error('storybook case')
    }
    const res = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: { _expand: 'user' },
    })
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
