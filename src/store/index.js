import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { reducer as repositories } from '../modules/Repositories'

const appReducer = combineReducers({
  repositories
})

const store = createStore(appReducer, applyMiddleware(thunk))

export default store
