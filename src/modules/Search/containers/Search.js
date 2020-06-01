import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import useDebounce from '../useDebounce'
import useQuery from '../../../common/useQuery'

import { setLoading, updateRepositories } from '../../Repositories/redux/actions'
import { searchRepositories } from '../../../api'
import Search from '../components'

const mapDispatchToProps = {
  setLoading,
  updateRepositories
}

const SearchContainer = ({ setLoading, updateRepositories }) => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)
  const { formatMessage } = useIntl()
  const query = useQuery()
  const history = useHistory()
  const page = query.get('page')
  const searchString = query.get('q')

  const searchRepositoriesAsync = async (searchText, page = 1) => {
    const startTime = (new Date()).getTime()
    const { items, total_count: totalCount } = await searchRepositories({ search: searchText, page })
    const endTime = (new Date()).getTime()

    updateRepositories({ items, totalCount, responseTime: (endTime - startTime) })
  }

  useEffect(() => {
    if (searchString && page && searchString !== searchText) {
      setLoading(true)
      searchRepositoriesAsync(searchString, page)
    }

    if (debouncedSearchText) {
      history.push(`/?q=${debouncedSearchText}&page=1`)
      setLoading(true)
      searchRepositoriesAsync(debouncedSearchText)
    } else {
      updateRepositories()
    }
  }, [debouncedSearchText])

  return <Search onChange={e => setSearchText(e.target.value)} formatMessage={formatMessage} />
}

SearchContainer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  updateRepositories: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SearchContainer)
