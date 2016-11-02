import { createAction, createReducer } from 'redux-act'

export const a = createAction()

export default createReducer({
  [a]: state => ({ ...state })
}, {
  text: 'dfsdf'
})
