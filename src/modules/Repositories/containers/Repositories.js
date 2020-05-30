import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { compose } from 'redux'

import Repositories from '../components'
import Loading from '../components/Loading'

const mapStateToProps = ({ repositories: { items, totalCount, loading } }) => ({
  items,
  loading,
  totalCount
})

const RepositoriesContainer = ({ items, loading, totalCount }) => {
  if (loading) return <Loading />

  return <Repositories items={items} totalCount={totalCount} />
}

RepositoriesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(RepositoriesContainer)
