import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'patient', 'therapist', 'admin'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedType = localStorage.getItem('userType')
    if (storedUser && storedType) {
      setUser(JSON.parse(storedUser))
      setUserType(storedType)
    }
    setLoading(false)
  }, [])

  const login = (userData, type) => {
    setUser(userData)
    setUserType(type)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userType', type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
  }

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
