import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

// Sopstveni hook: bilo koja komponenta piše samo const { user } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth mora da se koristi unutar <AuthProvider>.')
  }

  return context
}
