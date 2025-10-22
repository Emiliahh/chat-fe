import { Search } from 'lucide-react'
import ChatCard from '../ChatCard'
import { Input } from '../ui/input'
import { useParams } from '@tanstack/react-router'
import AsideMenu from './AsideMenu'
import AddMenu from './AddMenu'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getList } from '@/api/conversation_api'
import dayjs from 'dayjs'
export default function AsideTab() {
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
  return (
    <div className="bg-ui-secondary group scrollbar relative flex h-screen flex-col text-neutral-200">
      <div className="sticky top-0 flex flex-shrink-0 items-center gap-2 p-4">
        <AsideMenu />
        <div className="relative h-10 flex-1">
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <Search className="h-5 w-5" />
          </div>
          <Input className="bg-dark h-full rounded-full border-0 pl-10" />
        </div>
      </div>
      <div className="scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2">
        {result.data?.pages.map((page) =>
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
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="text-gray-400">Loading more...</div>
          </div>
        )}
      </div>
      <div className="absolute right-5 bottom-5">
        <AddMenu />
      </div>
    </div>
  )
}
