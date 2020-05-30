import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'

import RepositoryItem from './RepositoryItem'

const Repositories = ({ items, totalCount }) => (
  <div className='pt-5 container'>
    {items.length === 0 &&
      <div className='card'>
        <div className='card-body text-center'>
          <p className='lead mt-3'>Today is a beautiful day to search for new repositories!</p>
          <p className='mt-0'>Start now by typing on the search input above.</p>
        </div>
      </div>}

    {items.length > 0 &&
      <div className='d-flex justify-content-end pr-1'>
        <p className='text-info'>Resultados em 400 milisegundos</p>
      </div>}

    {items.length > 0 &&
      <div className='list-group shadow'>
        {items.map((item, i) => <RepositoryItem item={item} key={i} />)}
      </div>}

    {totalCount > 10 &&
      <div className='mt-3 d-flex justify-content-center'>
        <ReactPaginate
          pageCount={Math.ceil(totalCount / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          previousLabel='«'
          nextLabel='»'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          disabledClassName='disabled'
          initialPage={0}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
        />
      </div>}
  </div>
)

Repositories.propTypes = {
  items: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired
}

export default Repositories
