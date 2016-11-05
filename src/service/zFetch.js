import { shortShow } from './toast'
import Storage from './storage'

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
