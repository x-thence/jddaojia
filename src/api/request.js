import axios from 'axios'
const instance = axios.create()

instance.defaults.timeout = 10000
instance.defaults.baseURL = 'https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api'

class Request {
  post (url, params) {
    return instance.post(url, { ...params })
  }

  get (url, params) {
    let qs = '?'
    for (const key in params) {
      qs += `${key}=${params[key]}&`
    }
    qs = qs.slice(0, -1)
    return instance.get(url + qs)
  }
}

export default new Request()
