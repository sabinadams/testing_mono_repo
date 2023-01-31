import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  validateStatus: status => status < 500
})

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const user = localStorage.getItem('quoots-user')
  if (user) {
    const token = JSON.parse(user).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}

const handleResponse = (response: AxiosResponse) => {
  if (response.status === 401) {
    localStorage.removeItem('quoots-user')
  }
  return response
}

instance.interceptors.request.use(handleRequest)
instance.interceptors.response.use(handleResponse, e => {
  toast.error(e.message)
})

export default instance
