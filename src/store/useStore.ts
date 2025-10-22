import { create } from 'zustand'
interface UserData {
  id: string
  name: string
  email: string
  profileImage?: string
}
type StoreState = {
  user: UserData | null
  setUser: (user: UserData | null) => void
}
export const userStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
