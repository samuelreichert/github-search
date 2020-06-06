export const initialState = {
  items: [],
  totalCount: 0,
  loading: false,
  responseTime: 0,
  error: null
}

const reducer = (state = initialState, { type, items, totalCount, loading, responseTime, error }) => {
  switch (type) {
    case 'UPDATE_REPOSITORIES':
      return {
        ...state,
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
    case 'SET_ERROR':
      return {
        ...state,
        error
      }
    default:
      return state
  }
}

export default reducer
