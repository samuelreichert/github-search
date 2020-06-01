import React from 'react'
import PropTypes from 'prop-types'

import RepositoryItem from './RepositoryItem'
import Pagination from '../containers/Pagination'

const Repositories = ({ items, totalCount, formatMessage, responseTime }) => (
  <div className='py-5 container'>
    {items.length === 0 &&
      <div className='card'>
        <div className='card-body text-center'>
          <p className='lead mt-3'>{formatMessage({ id: 'initialScreenPhrase' })}</p>
          <p className='mt-0'>{formatMessage({ id: 'secondaryPhrase' })}</p>
        </div>
      </div>}

    {items.length > 0 &&
      <div className='d-flex justify-content-end pr-1'>
        <p className='text-info'>{formatMessage({ id: 'searchTime' }, { time: responseTime })}</p>
      </div>}

    {items.length > 0 &&
      <div className='list-group shadow'>
        {items.map((item, i) => <RepositoryItem item={item} key={i} formatMessage={formatMessage} />)}
      </div>}

    {totalCount > 10 && <Pagination totalCount={totalCount} />}
  </div>
)

Repositories.propTypes = {
  items: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  formatMessage: PropTypes.func.isRequired,
  responseTime: PropTypes.number.isRequired
}

export default Repositories
