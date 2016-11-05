import { combineReducers } from 'redux'
import mainReducer from './main'
import messageReducer from './message'
import galleryReducer from './gallery'
import loginReducer from './login'

export default combineReducers({
  mainReducer, messageReducer, galleryReducer, loginReducer
})
