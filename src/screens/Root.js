import React from 'react'

import Navbar from '../modules/Navbar'
import Repositories from '../modules/Repositories'
import Search from '../modules/Search'

const Root = () => {
  return (
    <>
      <Navbar />

      <Search />

      <Repositories />
    </>
  )
}

export default Root
