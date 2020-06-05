import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'

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

const RepositoriesContainer = ({ items, loading, totalCount, responseTime, searchText, error }) => {
  const { formatMessage } = useIntl()

  if (error) {
    return <ErrorCard message={formatMessage({ id: 'repositoriesError' })} />
  }

  if (loading) return <Loading formatMessage={formatMessage} />

  if (searchText && responseTime && !loading && !totalCount) {
    return <RepositoriesNotFound formatMessage={formatMessage} />
  }

  return (
    <Repositories
      items={items}
      totalCount={totalCount}
      formatMessage={formatMessage}
      responseTime={responseTime}
    />
  )
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
