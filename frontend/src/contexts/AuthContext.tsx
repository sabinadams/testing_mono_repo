import React, { useContext, useState, createContext } from 'react'
import * as _auth from '../services/AuthService'
import type { AuthContextType, User } from '../types'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

let AuthContext: React.Context<AuthContextType>

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (username: string, password: string) => {
    setLoading(true)
    await _auth.login(username, password)
    const user = _auth.loadUser()
    setCurrentUser(user)
    setLoading(false)
  }

  const logout = () => {
    setCurrentUser(null)
    _auth.logout()
  }

  const signup = async (username: string, password: string) => {
    setLoading(true)
    await _auth.signup(username, password)
    const user = _auth.loadUser()
    setCurrentUser(user)
    setLoading(false)
  }

  const value = {
    user: currentUser,
    signup,
    login,
    logout
  }

  AuthContext = createContext(value)

  useEffect(() => {
    const user = _auth.loadUser()
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!loading && <Outlet />}
    </AuthContext.Provider>
  )
}
