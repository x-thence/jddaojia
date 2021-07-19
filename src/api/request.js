import axios from 'axios'
const instance = axios.create()

instance.defaults.timeout = 10000
instance.defaults.baseURL = 'https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api'

class Request {
  post (url, params) {
    return new Promise((resolve, reject) => {
      instance.post(url, params).then((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  get (url, params) {
    return new Promise((resolve, reject) => {
      let qs = '?'
      for (const key in params) {
        qs += `${key}=${params[key]}&`
      }
      qs = qs.slice(0, -1)
      instance.get(url + qs).then((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }
}

export default new Request()
