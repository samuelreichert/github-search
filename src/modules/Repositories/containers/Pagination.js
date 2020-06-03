import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useQuery from '../../../hooks/useQuery'

import { setLoading, updateRepositories } from '../redux/actions'
import { searchRepositories } from '../../../api'
import Pagination from '../components/Pagination'

const mapDispatchToProps = {
  setLoading,
  updateRepositories
}

const PaginationContainer = ({ totalCount, setLoading, updateRepositories }) => {
  const history = useHistory()
  const query = useQuery()
  const page = query.get('page')
  const searchString = query.get('q')

  const handlePageChange = async (selectedPage) => {
    if (page !== selectedPage) {
      setLoading(true)
      history.push(`/?q=${searchString}&page=${selectedPage}`)

      const startTime = (new Date()).getTime()
      const { items, total_count: totalCount } = await searchRepositories({ search: searchString, page: selectedPage })
      const endTime = (new Date()).getTime()
      updateRepositories({ items, totalCount, responseTime: (endTime - startTime) })
    }
  }

  return <Pagination handlePageChange={handlePageChange} totalCount={totalCount} activePage={page} />
}

PaginationContainer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  updateRepositories: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(PaginationContainer)
