import React from 'react'
import PropTypes from 'prop-types'

const RepositoriesNotFound = ({ formatMessage }) => (
  <div className='py-5 container'>
    <div className='card shadow'>
      <div className='card-body text-center'>
        <p className='lead mt-3'>{formatMessage({ id: 'repositoriesNotFoundText' })}</p>
      </div>
    </div>
  </div>
)

RepositoriesNotFound.propTypes = {
  formatMessage: PropTypes.func.isRequired
}

export default RepositoriesNotFound
