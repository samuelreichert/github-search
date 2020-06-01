const initialState = {
  items: [],
  totalCount: 0,
  loading: false,
  responseTime: 0
}

const reducer = (state = initialState, { type, items, totalCount, loading, responseTime }) => {
  switch (type) {
    case 'UPDATE_REPOSITORIES':
      return {
        items,
        totalCount,
        loading,
        responseTime
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
