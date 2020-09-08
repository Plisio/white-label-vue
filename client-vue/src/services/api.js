import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const api = axios.create({
  baseURL: '/',
  headers: {
    common: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

export default api
