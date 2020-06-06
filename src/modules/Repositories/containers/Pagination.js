import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useQuery from '../../../hooks/useQuery'

import { setLoading, updateRepositories, setError } from '../redux/actions'
import { searchRepositories } from '../../../api'
import Pagination from '../components/Pagination'

const mapStateToProps = ({ repositories: { totalCount } }) => ({ totalCount })

const mapDispatchToProps = {
  setLoading,
  updateRepositories,
  setError
}

export const PaginationContainer = ({ totalCount, setLoading, updateRepositories, setError }) => {
  const history = useHistory()
  const query = useQuery()
  const page = query.get('page')
  const searchString = query.get('q')

  const handlePageChange = async (selectedPage) => {
    if (page !== selectedPage) {
      setLoading(true)
      history.push(`/?q=${searchString}&page=${selectedPage}`)

      const startTime = (new Date()).getTime()
      const { items, total_count: totalCount, error } = await searchRepositories({ search: searchString, page: selectedPage })
      const endTime = (new Date()).getTime()

      if (error) {
        setLoading(false)
        return setError(error)
      }

      updateRepositories({ items, totalCount, responseTime: (endTime - startTime) })
    }
  }

  return <Pagination handlePageChange={handlePageChange} totalCount={totalCount} activePage={page || '1'} />
}

PaginationContainer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  updateRepositories: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
