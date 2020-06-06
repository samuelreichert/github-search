import * as actions from './actions'

describe('actions', () => {
  it('should create an action to set the search text', () => {
    const searchText = 'react'
    const expectedAction = {
      type: 'SET_SEARCH_TEXT',
      searchText
    }
    expect(actions.setSearchText(searchText)).toEqual(expectedAction)
  })
})
