import type { MessagePagination } from '@/interface/chat'
import instance from './useApi'

const getMessage = async (id: string, page: number, limit: number) => {
  const { data } = await instance.get<MessagePagination>(`chat/${id}`, {
    params: { page, limit },
  })
  return data
}
export { getMessage }
