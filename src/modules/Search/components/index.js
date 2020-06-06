import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

const Search = ({ onChange }) => {
  const { formatMessage } = useIntl()

  return (
    <div className='bg-secondary py-4'>
      <div className='container d-flex flex-column justify-content-center align-items-center py-5'>
        <h1 className='text-white'>{formatMessage({ id: 'searchTitle' })}</h1>
        <input
          className='form-control form-control-lg'
          onChange={onChange}
          placeholder={formatMessage({ id: 'searchPlaceholder' })}
          type='search'
        />
      </div>
    </div>
  )
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Search
