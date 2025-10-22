import type { Pagination } from './pagination'

interface Sender {
  id: string
  name: string
  image?: string
}
export interface Message {
  id: string
  content: string
  createdAt: string
  sender: Sender
}
export interface MessagePagination {
  data: Message[]
  pagination: Pagination
}