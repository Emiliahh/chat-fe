import type { ConversationsApiResponse } from '@/interface/conversation'
import instance from './useApi'

const getList = async (page: number, limit: number) => {
  const { data } = await instance.get<ConversationsApiResponse>(
    '/conversation',
    {
      params: {
        page,
        limit,
      },
    },
  )
  return data
}
export { getList }
