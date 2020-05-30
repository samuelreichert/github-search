const initialState = {
  items: [],
  totalCount: 0,
  loading: false
}

const reducer = (state = initialState, { type, items, totalCount, loading }) => {
  switch (type) {
    case 'UPDATE_REPOSITORIES':
      return {
        items,
        totalCount,
        loading
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading
      }
    default:
      return state
  }
}

export default reducer
