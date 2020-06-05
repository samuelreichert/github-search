import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import useDebounce from '../../../hooks/useDebounce'
import useQuery from '../../../hooks/useQuery'

import { setLoading, updateRepositories, setError } from '../../Repositories/redux/actions'
import { setSearchText } from '../redux/actions'
import { searchRepositories } from '../../../api'
import Search from '../components'

const mapStateToProps = ({ search: { searchText } }) => ({ searchText })

const mapDispatchToProps = {
  setLoading,
  updateRepositories,
  setSearchText,
  setError
}

const SearchContainer = ({ setLoading, updateRepositories, setSearchText, searchText, setError }) => {
  const debouncedSearchText = useDebounce(searchText, 600)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const query = useQuery()
  const searchString = query.get('q')
  const page = query.get('page')

  const searchRepositoriesAsync = async (searchText, page = 1) => {
    const startTime = (new Date()).getTime()
    const { items, total_count: totalCount, error } = await searchRepositories({ search: searchText, page })
    const endTime = (new Date()).getTime()

    if (error) {
      setLoading(false)
      return setError(error)
    }

    updateRepositories({ items, totalCount, responseTime: (endTime - startTime) })
  }

  useEffect(() => {
    if (debouncedSearchText) {
      setLoading(true)
      return history.push(`/?q=${debouncedSearchText}&page=1`)
    } else {
      setLoading(true)
      return history.push('/')
    }
  }, [debouncedSearchText])

  useEffect(() => {
    if (searchString) {
      const selectedPage = page || 1
      searchRepositoriesAsync(searchString, selectedPage)
    } else {
      updateRepositories()
    }
  }, [searchString])

  return <Search onChange={e => setSearchText(e.target.value)} formatMessage={formatMessage} />
}

SearchContainer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  updateRepositories: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
