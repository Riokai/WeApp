import { createAction, createReducer } from 'redux-act'
import zFetch from '../service/zFetch'

export const setToken = createAction('set qiniu token')

export function fetchUptoken() {
  return async dispatch => {
    const data = await zFetch('/api/qiniu/token')

    if (data) {
      const token = data.token
      dispatch(setToken(token))

      return token
    }
  }
}

const initialState = {
  upToken: ''
}

export default createReducer({
  [setToken]: (state, uptoken) => ({ ...state, uptoken })
}, initialState)
