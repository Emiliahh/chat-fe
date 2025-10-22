import { getMessage } from '@/api/chat_api'
import ChatBar from '@/components/ChatBar'
import ChatBubble from '@/components/ChatBubble'
import { useInView } from 'react-intersection-observer'
import ChatHeader from '@/components/ChatHeader'
import Loader from '@/components/Loader'
import type { ConversationsApiResponse } from '@/interface/conversation'
import { userStore } from '@/store/useStore'
import { formatTimeToHHMM } from '@/utils/timeFormat'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useChatSocket, useJoinRoom } from '@/hooks/useSocket'
import type { Message } from '@/interface/chat'
import { useMessageHandler } from '@/hooks/useMessageHook'
import { useAuth } from '@/store/useAuth'

export const Route = createFileRoute('/_main/$id')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { queryClient } = context
    const { id } = params

    const conversationsData = queryClient.getQueryData<{
      pages: ConversationsApiResponse[]
      pageParams: unknown[]
    }>(['conversations'])

    const allConversations =
      conversationsData?.pages?.flatMap((page) => page.data || []) || []

    const chat = allConversations.find((chat: any) => chat.id === id)

    if (!chat) {
      throw redirect({
        to: '/',
      })
    }
    return chat
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const param = Route.useParams()
  const { token } = useAuth()
  const socket = useChatSocket(token)
  useJoinRoom(socket, param.id)
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data: pagesData,
  } = useInfiniteQuery({
    queryKey: ['conversations', param.id, 'messages'],
    queryFn: ({ pageParam }) => getMessage(param.id, pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1
      }
      return undefined
    },
  })

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  const { user } = userStore()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const [displayMessage, setDisplayMessage] = useState<Message[]>([])
  const { sendMessage, setTypingStatus } = useMessageHandler(
    socket,
    setDisplayMessage,
  )
  const setTying = () => {
    setTypingStatus(param.id!, true)
  }
  const removeTying = () => {
    setTypingStatus(param.id!, false)
  }
  useEffect(() => {
    if (pagesData?.pages) {
      const allMessages = pagesData.pages
        .flatMap((page) => page.data ?? [])
        .reverse()
      setDisplayMessage(allMessages)
    }
  }, [pagesData, hasNextPage])
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }
  }, [displayMessage])

  return (
    <div className="flex h-screen flex-col">
      <div className="bg-ui-secondary border-gray-500 text-white">
        <ChatHeader
          avatarUrl={data?.image}
          name={data?.name}
          lastActive="2 hours ago"
        />
      </div>

      <main
        ref={scrollContainerRef}
        className="scrollbar flex-1 overflow-y-auto p-4"
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl flex-col">
            {hasNextPage && (
              <div
                ref={ref}
                className="h-4 w-full border border-red-400 bg-red-200"
              ></div>
            )}
            {isFetchingNextPage && (
              <div className="py-2 text-center">Loading more messages...</div>
            )}
            {displayMessage.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.content}
                avatarUrl={msg.sender.image}
                isUser={msg.sender.id === user?.id}
                sendTime={formatTimeToHHMM(msg.createdAt)}
              />
            ))}
          </div>
        )}
      </main>

      <div className="w-full pt-2 pb-6">
        <div className="mx-auto max-w-3xl">
          <ChatBar
            onSubmit={sendMessage}
            userId={user?.id ?? ''}
            conversationId={param.id}
            onTyping={setTying}
            onStopTyping={removeTying}
          />
        </div>
      </div>
    </div>
  )
}
