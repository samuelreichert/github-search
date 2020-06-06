import React from 'react'
import { useIntl } from 'react-intl'

const Loading = () => {
  const { formatMessage } = useIntl()

  return (
    <div className='d-flex justify-content-center py-5'>
      <div className='spinner-border my-5' style={{ width: '4rem', height: '4rem' }} role='status'>
        <span className='sr-only'>{formatMessage({ id: 'loading' })}</span>
      </div>
    </div>
  )
}

export default Loading
