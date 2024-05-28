import axios from 'axios'
import { getToken } from '../utils/cookies'

// create singleton for axios
const service = axios.create({
  baseURL: process.env.baseUrl,
  mode: 'cors',
  credentials: 'same-origin'
  // timeout: 30000
})

console.log(process.env.baseUrl)

service.interceptors.request.use((config) => {
  if (!config.public) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
})

// response interceptor
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

export default service
