import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string | null
  setToken: (token: string | null) => void
}
export const useAuth = create<State>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
