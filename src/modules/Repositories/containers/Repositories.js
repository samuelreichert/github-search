import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'

import Repositories from '../components'
import Loading from '../components/Loading'
import RepositoriesNotFound from '../components/RepositoriesNotFound'

const mapStateToProps = (
  {
    repositories: { items, totalCount, loading, responseTime },
    search: { searchText }
  }) => ({
  items,
  loading,
  totalCount,
  responseTime,
  searchText
})

const RepositoriesContainer = ({ items, loading, totalCount, responseTime, searchText }) => {
  const { formatMessage } = useIntl()

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
  searchText: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(RepositoriesContainer)
