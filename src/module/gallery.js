import { createAction, createReducer } from 'redux-act'
import zFetch from '../service/zFetch'
import { shortShow } from '../service/toast'

export const setToken = createAction('set qiniu token')
export const setAlbumData = createAction('get album data')
export const toggleModal = createAction('toggle modal')
export const setAlbumName = createAction('set album name')

export function fetchAlbumList() {
  return async dispatch => {
    const data = await zFetch('/api/album')

    if (data) {
      dispatch(setAlbumData(data))
    }
  }
}

export function addNewAlbum() {
  return async (dispatch, getState) => {
    const { albumData, albumName } = getState().galleryReducer

    if (!albumName.trim()) {
      shortShow('相册名不能为空')

      return
    }

    const data = await zFetch('/api/album', {
      method: 'POST',
      body: {
        name: albumName
      }
    })

    console.log('data', data)

    if (data) {
      dispatch(setAlbumData([
        ...albumData,
        data
      ]))

      dispatch(toggleModal())
      shortShow('相册创建成功')
    }
  }
}

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
  upToken: '',
  albumData: [],
  albumName: '',
  isShowModal: false
}

export default createReducer({
  [setToken]: (state, uptoken) => ({ ...state, uptoken }),
  [setAlbumData]: (state, albumData) => ({ ...state, albumData }),
  [setAlbumName]: (state, albumName) => ({ ...state, albumName }),
  [toggleModal]: (state, isShowModal = false) => ({ ...state, isShowModal, albumName: '' })
}, initialState)
