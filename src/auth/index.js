import { createContext, useContext } from 'react'

// open('login' | 'signup', { plan }) shows the account dialog from anywhere.
export const AuthContext = createContext({ open: () => {} })

export function useAuthModal() {
  return useContext(AuthContext)
}
