import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { compose } from 'redux'

import useDebounce from '../useDebounce'
import Search from '../components'
import { searchRepositories } from '../../../api'
import { setLoading, updateRepositories } from '../../Repositories/redux/actions'

const mapDispatchToProps = {
  setLoading,
  updateRepositories
}

const SearchContainer = ({ setLoading, updateRepositories }) => {
  const [searchText, setSearchText] = useState('')

  const debouncedSearchText = useDebounce(searchText, 500)
  const searchRepositoriesAsync = async (searchText) => {
    const { items, total_count: totalCount } = await searchRepositories({ search: searchText })
    updateRepositories({ items, totalCount })
  }

  useEffect(() => {
    if (debouncedSearchText) {
      setLoading(true)
      searchRepositoriesAsync(debouncedSearchText)
    } else {
      updateRepositories({ items: [], totalCount: 0 })
    }
  }, [debouncedSearchText])

  return <Search onChange={e => setSearchText(e.target.value)} />
}

SearchContainer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  updateRepositories: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SearchContainer)
