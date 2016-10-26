import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './module'

const enhancer = applyMiddleware(thunk)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
