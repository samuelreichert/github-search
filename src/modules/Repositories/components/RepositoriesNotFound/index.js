import React from 'react'
import { useIntl } from 'react-intl'

const RepositoriesNotFound = () => {
  const { formatMessage } = useIntl()

  return (
    <div className='py-5 container'>
      <div className='card shadow'>
        <div className='card-body text-center'>
          <p className='lead mt-3'>{formatMessage({ id: 'repositoriesNotFoundText' })}</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoriesNotFound
