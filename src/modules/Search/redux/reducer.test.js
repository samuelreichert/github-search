import reducer, { initialState } from './reducer'

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should handle SET_SEARCH_TEXT', () => {
    const searchText = 'react'

    expect(
      reducer(initialState, {
        type: 'SET_SEARCH_TEXT',
        searchText
      })
    ).toEqual({
      searchText: 'react'
    })
  })
})
