import React from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

import Navbar from '../modules/Navbar'
import Repositories from '../modules/Repositories'
import Search from '../modules/Search'
import Footer from '../modules/Footer'

const Root = () => {
  return (
    <Router>
      <div className='flex-shrink-0'>
        <Navbar />

        <Switch>
          <Route path='/'>
            <Search />
            <Repositories />
          </Route>
        </Switch>
      </div>

      <Footer />
    </Router>
  )
}

export default Root
