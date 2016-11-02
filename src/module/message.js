import { createAction, createReducer } from 'redux-act'

export const toggleBackdrop = createAction('切换backdrop')

const initialState = {
  data: [
    {
      name: 'Kai',
      date: '2016-10-29 21:16:38',
      floor: 1,
      content: 'dfdsfe'
    }
  ],
  isShowBackdrop: false
}

export default createReducer({
  [toggleBackdrop]: (state, isShowBackdrop = false) => ({ ...state, isShowBackdrop })
}, initialState)
