import axios from 'axios'
import { refresh } from './auth_api'
import queryClient from '@/lib/queryClient'
import { useAuth } from '@/store/useAuth'
const instance = axios.create({
  baseURL: 'http://localhost:3000',
})
instance.interceptors.request.use(
  (config) => {
    const { token } = useAuth.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { setToken } = useAuth.getState()
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await refresh()
        const { accessToken } = response.data
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        setToken(accessToken)
        return instance(originalRequest)
      } catch (refreshError) {
        console.error('Session expired. Please log in again.', refreshError)
        localStorage.removeItem('token')
        queryClient.removeQueries({ queryKey: ['user', 'me'] })
        return Promise.reject(new Error('UNAUTHORIZED'))
      }
    }
    return Promise.reject(error)
  },
)

export default instance
