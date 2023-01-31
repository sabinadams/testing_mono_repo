import { toast } from 'react-toastify'
import type { AuthResponse } from '../types'
import axios from './HttpService'

export const login = async (username: string, password: string) => {
  const { data, status } = await axios.post<AuthResponse>(`/auth/signin`, {
    username,
    password
  })

  if (status === 200) {
    localStorage.setItem(
      'quoots-user',
      JSON.stringify({
        ...data.user,
        token: data.token
      })
    )
  } else {
    toast.error(data.message)
  }
}

export const logout = () => {
  localStorage.removeItem('quoots-user')
}

export const signup = async (username: string, password: string) => {
  const { data, status } = await axios.post<AuthResponse>(`/auth/signup`, {
    username,
    password
  })

  if (status === 200) {
    localStorage.setItem(
      'quoots-user',
      JSON.stringify({
        ...data.user,
        token: data.token
      })
    )
  } else {
    toast.error(data.message)
  }
}

export const loadUser = () => {
  const user = localStorage.getItem('quoots-user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}
