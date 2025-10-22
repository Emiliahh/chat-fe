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
interface CreateConversationDto {
  anotherUserId: string[]
  type: 'private' | 'group'
  message?: string
  name?: string
}
interface ConversationParticipant {
  id: string
  name: string
  profileImage?: string
  role?: string
}

export interface ConversationItem {
  id: string
  name: string
  profileImage?: string
  participants: ConversationParticipant[]
  lastActivity: string | null
}
const createConversation = async (dto: CreateConversationDto) => {
  const { data } = await instance.post('/conversation', dto)
  return data
}
const getConversationById = async (id: string) => {
  const { data } = await instance.get<ConversationItem>(`/conversation/${id}`)
  return data
}
export { getList, createConversation, getConversationById }
