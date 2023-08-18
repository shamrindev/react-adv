import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

// NOTE: mock-API portfolio app. The "token" is just the stored user record
// (json-server has no real JWT issuer), so client-side role guards are
// demonstrative, not a real security boundary.
export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
      if (token) {
        headers.set('Authorization', token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})
