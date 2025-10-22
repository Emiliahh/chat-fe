import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import ChatCard from '../ChatCard'
import { useParams } from '@tanstack/react-router'
import AsideMenu from './AsideMenu'
import AddMenu from './AddMenu'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getList } from '@/api/conversation_api'
import dayjs from 'dayjs'
import UserSearchOverlay from '../UserSearchOverlay'
import type { Conversation } from '@/interface/conversation'
import type { NotificationUpdate } from '@/hooks/useNotificationHook'
import useNotificationHandler from '@/hooks/useNotificationHook'

export default function AsideTab() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { id } = useParams({ strict: false })
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ['conversations'],
    queryFn: ({ pageParam }) => getList(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
        return lastPage.pagination.currentPage + 1
      }
      return undefined
    },
    staleTime: 5 * 60 * 1000,
  })
  const [displayMessage, setDisplayMessage] = useState<Conversation[]>([])
  const updateNotification = (notification: NotificationUpdate) => {
    // update and push to top
    setDisplayMessage((prevMessages) => {
      const index = prevMessages.findIndex(
        (msg) => msg.id === notification.content.id,
      )
      let updatedMessages = [...prevMessages]
      if (index !== -1) {
        updatedMessages[index] = {
          ...updatedMessages[index],
          lastMessage: {
            id: notification.content.id,
            content: notification.content.content,
            createdAt: notification.content.createdAt,
            sender: notification.content.sender,
          },
        }
        const [movedMessage] = updatedMessages.splice(index, 1)
        updatedMessages = [movedMessage, ...updatedMessages]
      } else {
        const newMessage: Conversation = {
          id: notification.content.id,
          type: 'private',
          name: notification.content.sender.name,
          image: '',
          lastMessage: {
            id: notification.content.id,
            content: notification.content.content,
            createdAt: notification.content.createdAt,
            sender: notification.content.sender,
          },
          messageCount: 0,
          lastActivity: notification.content.createdAt,
        }
        updatedMessages = [newMessage, ...updatedMessages]
      }
      return updatedMessages
    })
  }
  useEffect(() => {
    const allConversations =
      result.data?.pages.flatMap((page) => page.data) || []
    setDisplayMessage(allConversations)
  }, [result.data])
  return (
    <div className="bg-ui-secondary group scrollbar relative flex h-screen flex-col text-neutral-200">
      <div className="sticky top-0 flex flex-shrink-0 items-center gap-2 p-4">
        <AsideMenu />
        <div
          className="bg-dark relative flex h-10 flex-1 cursor-pointer items-center rounded-full pl-10 text-neutral-400"
          onClick={() => setIsSearchOpen(true)}
        >
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <Search className="h-5 w-5" />
          </div>
          <span>Search users...</span>
        </div>
      </div>
      <div className="scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2">
        {/* {result.data?.pages.map((page) =>
          page.data?.map((chat: any) => (
            <ChatCard
              key={chat.id}
              isActive={chat.id === id}
              title={chat.name}
              avatar={chat.image}
              lastMessage={chat.lastMessage.content}
              timestamp={dayjs(chat.lastMessage.createdAt).format('HH:mm')}
              id={chat.id}
            />
          )),
        )} */}
        {displayMessage.map((chat) => (
          <ChatCard
            key={chat.id}
            isActive={chat.id === id}
            title={chat.name}
            avatar={chat.image}
            lastMessage={chat?.lastMessage?.content}
            timestamp={dayjs(chat?.lastMessage?.createdAt).format('HH:mm')}
            id={chat.id}
          />
        ))}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="text-gray-400">Loading more...</div>
          </div>
        )}
      </div>
      <div className="absolute right-5 bottom-5">
        <AddMenu />
      </div>
      {isSearchOpen && (
        <UserSearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  )
}
