export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  loading
})

export const updateRepositories = ({ items, totalCount, loading = false }) => ({
  type: 'UPDATE_REPOSITORIES',
  items,
  totalCount,
  loading
})
