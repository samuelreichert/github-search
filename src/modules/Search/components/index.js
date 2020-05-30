import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ onChange }) => (
  <div className='bg-info'>
    <div className='container d-flex flex-column justify-content-center align-items-center py-5'>
      <h1 className='text-white'>GitHub Search</h1>
      <input
        className='form-control form-control-lg'
        onChange={onChange}
        placeholder='Search repository...'
        type='search'
      />
    </div>
  </div>
)

Search.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Search
