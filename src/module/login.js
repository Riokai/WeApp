import { createAction, createReducer } from 'redux-act'
import zFetch from '../service/zFetch'
import { shortShow } from '../service/toast'
import Storage from '../service/storage'

export const setValue = createAction('set value')

const initialState = {
  mail: '2222',
  pwd: '',
  token: ''
}

export function login(email, password) {
  return async () => {
    const data = await zFetch('/auth/local', {
      method: 'POST',
      body: { email, password }
    }, false)

    if (data && data.token) {
      await Storage.setStr('token', data.token)

      shortShow('登录成功')

      return true
    }

    return false
  }
}


export default createReducer({
  [setValue]: (state, { key, value }) => ({ ...state, [key]: value })
}, initialState)
