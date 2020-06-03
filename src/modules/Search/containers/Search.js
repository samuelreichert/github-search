import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import useDebounce from '../../../hooks/useDebounce'
import useQuery from '../../../hooks/useQuery'

import { setLoading, updateRepositories } from '../../Repositories/redux/actions'
import { searchRepositories } from '../../../api'
import Search from '../components'

const mapDispatchToProps = {
  setLoading,
  updateRepositories
}

const SearchContainer = ({ setLoading, updateRepositories }) => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 600)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const query = useQuery()
  const searchString = query.get('q')
  const page = query.get('page')

  const searchRepositoriesAsync = async (searchText, page = 1) => {
    const startTime = (new Date()).getTime()
    const { items, total_count: totalCount } = await searchRepositories({ search: searchText, page })
    const endTime = (new Date()).getTime()

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
  updateRepositories: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SearchContainer)
