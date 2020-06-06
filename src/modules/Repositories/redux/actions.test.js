import * as actions from './actions'

describe('actions', () => {
  it('should create an action to set an error', () => {
    const error = { message: 'Network Error' }
    const expectedAction = {
      type: 'SET_ERROR',
      error
    }
    expect(actions.setError(error)).toEqual(expectedAction)
  })

  it('should create an action to set the loading state', () => {
    const expectedAction = {
      type: 'SET_LOADING',
      loading: true
    }
    expect(actions.setLoading(true)).toEqual(expectedAction)
  })

  it('should create an action to update the repositories with content', () => {
    const items = [
      { name: 'react' },
      { name: 'redux' }
    ]
    const totalCount = 2
    const loading = false
    const responseTime = 100

    const expectedAction = {
      type: 'UPDATE_REPOSITORIES',
      items,
      totalCount,
      loading,
      responseTime
    }
    expect(actions.updateRepositories({ items, totalCount, loading, responseTime })).toEqual(expectedAction)
  })

  it('should create an action to update the repositories to an initial state', () => {
    const items = []
    const totalCount = 0
    const loading = false
    const responseTime = 0

    const expectedAction = {
      type: 'UPDATE_REPOSITORIES',
      items,
      totalCount,
      loading,
      responseTime
    }
    expect(actions.updateRepositories()).toEqual(expectedAction)
  })
})
