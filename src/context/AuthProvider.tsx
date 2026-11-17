import { useEffect, useState, type ReactNode } from 'react'
import { getCurrentUser, loginUser, logoutUser, registerUser, type RegisterData, type User } from '../services/api'
import { AuthContext } from './authContext'

// Drži podatke o prijavljenom korisniku i deli ih celoj aplikaciji
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Pri učitavanju sajta: pitaj server da li je kolačić još važeći
  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null)) // server nedostupan: ponašaj se kao da niko nije prijavljen
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, password: string) {
    setUser(await loginUser(email, password))
  }

  async function register(input: RegisterData) {
    setUser(await registerUser(input))
  }

  async function logout() {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
