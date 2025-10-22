import type { GenericPageResponse, UserSearch } from '@/interface/conversation'
import instance from './useApi'

const me = async () => {
  const res = await instance.get('auth/me')
  return res
}
const searchUser = async (email: string, page: number, limit: number) => {
  const { data } = await instance.get<GenericPageResponse<UserSearch>>(
    `user/search`,
    {
      params: { email, page, limit },
    },
  )
  return data
}
export { me, searchUser }
