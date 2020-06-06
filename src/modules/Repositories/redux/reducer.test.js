import reducer, { initialState } from './reducer'

describe('Repositories reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should handle UPDATE_REPOSITORIES', () => {
    const items = [
      { name: 'react' },
      { name: 'redux' }
    ]

    expect(
      reducer(initialState, {
        type: 'UPDATE_REPOSITORIES',
        items,
        totalCount: 2,
        loading: false,
        responseTime: 100
      })
    ).toEqual({
      items,
      totalCount: 2,
      loading: false,
      responseTime: 100,
      error: null
    })
  })

  it('should handle SET_LOADING', () => {
    const loading = true

    expect(
      reducer(initialState, {
        type: 'SET_LOADING',
        loading
      })
    ).toEqual({
      ...initialState,
      loading: true
    })
  })

  it('should handle SET_ERROR', () => {
    const error = { message: 'Network Error' }

    expect(
      reducer(initialState, {
        type: 'SET_ERROR',
        error
      })
    ).toEqual({
      ...initialState,
      error: { message: 'Network Error' }
    })
  })
})
