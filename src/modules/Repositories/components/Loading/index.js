import React from 'react'

const Loading = () => (
  <div className='d-flex justify-content-center py-5'>
    <div className='spinner-border my-5' style={{ width: '4rem', height: '4rem' }} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  </div>
)

export default Loading
