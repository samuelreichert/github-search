import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Repositories from '../components'
import Loading from '../components/Loading'
import RepositoriesNotFound from '../components/RepositoriesNotFound'
import ErrorCard from '../../ErrorCard'

const mapStateToProps = (
  {
    repositories: { items, totalCount, loading, responseTime, error },
    search: { searchText }
  }) => ({
  items,
  loading,
  totalCount,
  responseTime,
  searchText,
  error
})

export const RepositoriesContainer = ({ items, loading, totalCount, responseTime, searchText, error }) => {
  if (error) return <ErrorCard messageId='repositoriesError' />
  if (loading) return <Loading />
  if (searchText && responseTime && !loading && !totalCount) return <RepositoriesNotFound />

  return <Repositories items={items} totalCount={totalCount} responseTime={responseTime} />
}

RepositoriesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  responseTime: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  error: PropTypes.any
}

export default connect(mapStateToProps)(RepositoriesContainer)
