import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

const ErrorCard = ({ messageId }) => {
  const { formatMessage } = useIntl()

  return (
    <div className='py-5 container'>
      <div className='card text-white bg-warning'>
        <div className='card-body'>
          <p className='card-text text-center lead'>
            <i className='fas fa-exclamation-circle mr-2' />
            <span>{formatMessage({ id: messageId })}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

ErrorCard.propTypes = {
  messageId: PropTypes.string.isRequired
}

export default ErrorCard
