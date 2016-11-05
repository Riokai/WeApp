import { createAction, createReducer } from 'redux-act'
import zFetch from '../service/zFetch'
import { shortShow } from '../service/toast'
import Storage from '../service/storage'

export const setValue = createAction('set value')
export const setProfile = createAction('set profile')

const initialState = {
  mail: '489272441@qq.com',
  pwd: '12345678',
  // is login?
  profile: {
    nickname: '',
    email: ''
  }
}

export function readData() {
  return async dispatch => {
    const result = await Storage.getJSON('profile')

    if (result) {
      dispatch(setProfile(result))
    }
  }
}

export function removeProfile() {
  return async dispatch => {
    await Storage.remove('profile')

    dispatch(setProfile({}))
  }
}

export function login(email, password) {
  return async () => {
    const data = await zFetch('/auth/local', {
      method: 'POST',
      body: { email, password }
    }, false)

    if (data && data.token) {
      await Storage.setJSON('profile', data)

      shortShow('登录成功')

      return true
    }

    return false
  }
}


export default createReducer({
  [setValue]: (state, { key, value }) => ({ ...state, [key]: value }),
  [setProfile]: (state, profile) => ({ ...state, profile })
}, initialState)
