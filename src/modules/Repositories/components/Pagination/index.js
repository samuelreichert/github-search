import React from 'react'
import PropTypes from 'prop-types'
import ReactPagination from 'react-js-pagination'

const Pagination = ({ handlePageChange, totalCount, activePage }) => (
  <div className='mt-3 d-flex justify-content-center'>
    <ReactPagination
      totalItemsCount={totalCount}
      onChange={handlePageChange}
      activePage={parseInt(activePage)}
      pageRangeDisplayed={5}
      itemClass='page-item'
      linkClass='page-link'
    />
  </div>
)

Pagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  activePage: PropTypes.string.isRequired
}

export default Pagination
