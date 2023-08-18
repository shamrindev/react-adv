import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addCommentForArticle } from './addCommentForArticle'

const baseState = {
  user: { authData: { id: '1' } },
  articleDetails: { data: { id: '10' } },
}

describe('addCommentForArticle.test', () => {
  test('posts the comment and refreshes the list on success', async () => {
    const comment = { id: '1', text: 'nice article' }
    const thunk = new TestAsyncThunk(addCommentForArticle, baseState)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }))

    const result = await thunk.callThunk('nice article')

    expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
      articleId: '10',
      userId: '1',
      text: 'nice article',
    })
    // the freshly-posted comment triggers a re-fetch of the article's comments
    expect(thunk.dispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comment)
  })

  test('rejects with "no data" when text/user/article are missing', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, baseState)

    const result = await thunk.callThunk('')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('rejects with "error" when the request fails', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, baseState)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: null }))

    const result = await thunk.callThunk('boom')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
