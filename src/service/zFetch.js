import { shortShow } from './toast'
import Storage from './storage'

const HOST = 'http://localhost:4000'

export default async function (url, options = {}, auth = true) {
  options.method = options.method || 'GET'
  options.headers = options.headers || {}

  const token = await Storage.getStr('token')

  if (options.body) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  if (auth) {
    options.headers = {
      ...options.headers,
      authorization: `Bearer ${token}`
    }
  }

  if (options.body) {
    options.body = JSON.stringify(options.body)
  }

  const deffer = () => {
    return new Promise((resolve, reject) => {
      fetch(`${HOST}${url}`, options)
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
        .catch(err => {
          reject(err)
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
