import { createContext } from 'react'
import type { RegisterData, User } from '../services/api'

// Šta svaka komponenta može da dobije iz useAuth()
export interface AuthContextValue {
  user: User | null // null = niko nije prijavljen
  isLoading: boolean // true dok proveravamo da li je neko prijavljen
  login: (email: string, password: string) => Promise<void>
  register: (input: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
