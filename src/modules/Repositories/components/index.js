import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import RepositoryItem from './RepositoryItem'
import Pagination from '../containers/Pagination'

const Repositories = ({ items, totalCount, responseTime }) => {
  const { formatMessage } = useIntl()

  return (
    <div className='py-5 container'>
      {!items.length &&
        <div className='card shadow'>
          <div className='card-body text-center'>
            <p className='lead mt-3'>{formatMessage({ id: 'initialScreenPhrase' })}</p>
            <p className='mt-0'>{formatMessage({ id: 'secondaryPhrase' })}</p>
          </div>
        </div>}

      {!!items.length &&
        <div className='d-flex justify-content-end pr-1'>
          <p className='text-info'>{formatMessage({ id: 'searchTime' }, { time: responseTime })}</p>
        </div>}

      {!!items.length &&
        <div className='list-group shadow'>
          {items.map((item, i) => <RepositoryItem item={item} key={i} />)}
        </div>}

      {totalCount > 10 && <Pagination />}
    </div>
  )
}

Repositories.propTypes = {
  items: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  responseTime: PropTypes.number.isRequired
}

export default Repositories
