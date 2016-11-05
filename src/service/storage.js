import { AsyncStorage } from 'react-native'

function getData(key) {
  return AsyncStorage.getItem(key, err => {
    if (err) {
      console.log('err', err)
    }
  })
}

function setData(key, value) {
  return AsyncStorage.setItem(key, value, err => {
    if (err) {
      console.log('err', err)
    }
  })
}

export default class Storage {
  static getStr(key) {
    return getData(key)
  }

  static setStr(key, value) {
    return setData(key, value)
  }

  static getJSON(key) {
    return getData(key).then(data => {
      return JSON.parse(data)
    })
  }

  static setJSON(key, value) {
    return setData(key, JSON.stringify(value))
  }
}
