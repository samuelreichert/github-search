import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ formatMessage }) => (
  <div className='d-flex justify-content-center py-5'>
    <div className='spinner-border my-5' style={{ width: '4rem', height: '4rem' }} role='status'>
      <span className='sr-only'>{formatMessage({ id: 'loading' })}</span>
    </div>
  </div>
)

Loading.propTypes = {
  formatMessage: PropTypes.func.isRequired
}

export default Loading
