import { shortShow } from './toast'
import Storage from './storage'

// const HOST = 'http://192.168.43.67:4000'
// const HOST = 'http://192.168.1.4:4000'
const HOST = 'http://localhost:4000'

export default async function (url, options = {}, auth = true) {
  options.method = options.method || 'GET'
  options.headers = options.headers || {}

  const profile = await Storage.getJSON('profile')

  if (options.body) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  if (auth) {
    options.headers = {
      ...options.headers,
      authorization: `Bearer ${profile.token}`
    }
  }

  if (options.body) {
    options.body = JSON.stringify(options.body)
  }

  const deffer = () => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject('请求超时')
      }, 5000)

      fetch(`${HOST}${url}`, options)
        .then(res => {
          clearTimeout(timer)
          if (res.json) {
            return res.json()
          }

          reject('响应数据错误')
        })
        .then(data => {
          if (data.code === 200) {
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
        .catch(err => {
          if (typeof err === 'object') {
            reject(err.message)
          } else {
            reject(err)
          }
        })
    })
  }

  let data

  try {
    data = await deffer()
  } catch (e) {
    shortShow(e)
  }

  return data
}
