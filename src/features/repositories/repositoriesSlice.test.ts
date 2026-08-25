import { describe, expect, it } from 'vitest'

import reducer, {
  clearRepositories,
  fetchRepositories,
  initialState,
} from './repositoriesSlice'

describe('repositoriesSlice', () => {
  it('tracks a repository search lifecycle', () => {
    const loadingState = reducer(
      initialState,
      fetchRepositories.pending('request', { page: 1, search: 'react' }),
    )
    expect(loadingState.status).toBe('loading')

    const succeededState = reducer(
      loadingState,
      fetchRepositories.fulfilled(
        { items: [], responseTime: 42, totalCount: 12 },
        'request',
        { page: 1, search: 'react' },
      ),
    )

    expect(succeededState).toMatchObject({
      responseTime: 42,
      status: 'succeeded',
      totalCount: 12,
    })
  })

  it('clears prior search results', () => {
    expect(
      reducer(
        { ...initialState, status: 'failed', error: 'failed' },
        clearRepositories(),
      ),
    ).toEqual(initialState)
  })
})
