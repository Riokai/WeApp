import { createAction, createReducer } from 'redux-act'
import zFetch from '../service/zFetch'
import { shortShow } from '../service/toast'

export const setToken = createAction('set qiniu token')
export const setAlbumData = createAction('get album data')
export const changeAlbumCurrent = createAction('change current album')
export const updateAlbumData = createAction('update album data')
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

export function addImage(id, hash) {
  return async dispatch => {
    const data = await zFetch(`/api/album/${id}`, {
      method: 'POST',
      body: { hash }
    })

    if (data) {
      shortShow('图片上传成功')

      dispatch(updateAlbumData(data))
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
  albumCurrent: 0,
  albumName: '',
  isShowModal: false
}

export default createReducer({
  [setToken]: (state, uptoken) => ({ ...state, uptoken }),
  [setAlbumData]: (state, albumData) => ({ ...state, albumData }),
  [changeAlbumCurrent]: (state, albumCurrent) => ({ ...state, albumCurrent }),
  [updateAlbumData]: (state, albumData) => {
    let albumIndex
    const cloneData = [...state.albumData]

    cloneData.some((album, index) => {
      // eslint-disable-next-line
      const result = album._id === albumData._id

      if (result) {
        albumIndex = index
      }

      return result
    })

    cloneData[albumIndex] = albumData

    return {
      ...state,
      albumData: cloneData
    }
  },
  [setAlbumName]: (state, albumName) => ({ ...state, albumName }),
  [toggleModal]: (state, isShowModal = false) => ({ ...state, isShowModal, albumName: '' })
}, initialState)
