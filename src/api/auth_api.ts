import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/auth',
  withCredentials: true,
})
const refresh = async () => {
  const res = await instance.get('token/refresh')
  return res
}
interface LoginParams {
  email: string
  password: string
}
const login = async (params: LoginParams) => {
  const res = await instance.post('login', params, {})
  return res.data
}
export { refresh, login }
