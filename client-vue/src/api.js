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

export const getQueryVariable = (variable) => {
  const foundOne = window.location.search.substring(1)
    .split('&')
    .filter(i => {
      return decodeURIComponent(i.split('=')[0]) === variable
    })
  if (foundOne.length) {
    return decodeURIComponent(foundOne[0].split('=')[1])
  }
}

export default api
