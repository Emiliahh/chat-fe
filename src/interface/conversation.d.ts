import type { Pagination } from './pagination'

interface Sender {
  id: string
  name: string
}

interface LastMessage {
  id: string
  content: string
  createdAt: string
  sender: Sender
}
interface User {
  id: string
  name: string
  profileImage: string
  email: string
}

interface Participant {
  id: string
  userId: string
  profileImage?: string
  role: string
  user: User
}
interface Conversation {
  id: string
  type: 'private' | 'group'
  name: string
  image: string
  participants: Participant[]
  lastMessage: LastMessage | null
  messageCount: number
  lastActivity: string // Could also be 'Date'
}
export interface ConversationsApiResponse {
  data: Conversation[]
  pagination: Pagination
}
