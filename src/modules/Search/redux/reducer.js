const initialState = {
  searchText: ''
}

const reducer = (state = initialState, { type, searchText }) => {
  switch (type) {
    case 'SET_SEARCH_TEXT':
      return {
        searchText
      }
    default:
      return state
  }
}

export default reducer
