import React from 'react'
import PropTypes from 'prop-types'

const ErrorCard = ({ message }) => (
  <div className='py-5 container'>
    <div className='card text-white bg-warning'>
      <div className='card-body'>
        <p className='card-text text-center lead'>
          <i className='fas fa-exclamation-circle mr-2' />
          {message}
          Unfortunately, there was an error trying to fetch the repositories from GitHub. You can try again soon!
        </p>
      </div>
    </div>
  </div>
)

ErrorCard.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorCard
