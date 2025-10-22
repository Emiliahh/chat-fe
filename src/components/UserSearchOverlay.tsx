import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { searchUser } from '@/api/user_api'
import { useInfiniteQuery } from '@tanstack/react-query'
import SearchChatCard from './SearchChatCard'
interface UserSearchOverlayProps {
  onClose: () => void
}

export default function UserSearchOverlay({ onClose }: UserSearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ['userSearch', searchTerm],
    enabled: searchTerm.length > 0,
    queryFn: ({ pageParam }) => searchUser(searchTerm, pageParam, 20),
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
    <div className="bg-ui-secondary absolute inset-0 z-10 flex flex-col text-neutral-200">
      <div className="flex items-center gap-2 p-4">
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-200"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative h-10 flex-1">
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <Search className="h-5 w-5" />
          </div>
          <Input
            className="bg-dark h-full rounded-full border-0 pl-10"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2">
        {result.data?.pages.map((page) =>
          page.data?.map((user: any) => (
            <SearchChatCard
              key={user.id}
              hasConversation={user.hasConversation}
              id={user.id}
              name={user.name}
              profileImage={user.profileImage}
              email={user.email}
            />
          )),
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="text-gray-400">Loading more...</div>
          </div>
        )}
      </div>
    </div>
  )
}
