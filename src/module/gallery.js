import { createAction, createReducer } from 'redux-act'

export const setToken = createAction('set qiniu token')

export function fetchUptoken() {
  return dispatch => {
    return fetch('http://localhost:4000/api/qiniu/token', {
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFjYjU0OTVkYmY2YzczMzhlMDc0YjQiLCJpYXQiOjE0NzgyNzY0MjUsImV4cCI6MTQ3ODQ0OTIyNX0.5YTi411sI9qItsbubXoM2IXYriI-AuHBITlIpsHme60'
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
