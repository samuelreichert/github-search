import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { reducer as repositories } from '../modules/Repositories'
import { reducer as search } from '../modules/Search'

const appReducer = combineReducers({
  repositories,
  search
})

const store = createStore(appReducer, applyMiddleware(thunk))

export default store
