import instance from './useApi'

const me = async () => {
  const res = await instance.get('auth/me')
  return res
}
export { me }
