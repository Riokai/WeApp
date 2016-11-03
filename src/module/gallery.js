import { createAction, createReducer } from 'redux-act'

export const setToken = createAction('set qiniu token')

export function fetchUptoken() {
  return dispatch => {
    return fetch('http://localhost:4000/api/qiniu/token', {
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFhYWY4YTI1MTk3ZDUxYmZhMzVhZjAiLCJpYXQiOjE0NzgxNDM4ODIsImV4cCI6MTQ3ODMxNjY4Mn0.j8P06voRXTllbDV7BcL4YRuAthzTrL_3RQB50v3lo44'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          dispatch(setToken(data.data.token))
          return data.data.token
        }
      })
  }
}

const initialState = {
  upToken: ''
}

export default createReducer({
  [setToken]: (state, uptoken) => ({ ...state, uptoken })
}, initialState)
