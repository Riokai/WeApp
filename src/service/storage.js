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
      if (data) {
        return JSON.parse(data)
      }

      return {}
    })
  }

  static setJSON(key, value) {
    return setData(key, JSON.stringify(value))
  }

  static remove(key) {
    return AsyncStorage.removeItem(key)
  }
}
