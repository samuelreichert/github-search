export const setError = (error) => ({
  type: 'SET_ERROR',
  error
})

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  loading
})

export const updateRepositories = ({ items = [], totalCount = 0, loading = false, responseTime = 0 } = {}) => ({
  type: 'UPDATE_REPOSITORIES',
  items,
  totalCount,
  loading,
  responseTime
})
