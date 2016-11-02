import { combineReducers } from 'redux'
import mainReducer from './main'
import messageReducer from './message'

export default combineReducers({
  mainReducer, messageReducer
})
