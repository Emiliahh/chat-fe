import { createConversation } from '@/api/conversation_api'
import ChatBar from '@/components/ChatBar'
import ChatHeader from '@/components/ChatHeader'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
const newConversationSchema = z.object({
  userId: z.string(),
  title: z.string().min(2).max(100),
  profileImage: z.string().url().nullable(),
})
export const Route = createFileRoute('/_main/new')({
  validateSearch: (search) => newConversationSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()
  const queryClient = useQueryClient()
  const createNewConversation = async (message: string) => {
    const data = await createConversation({
      message,
      anotherUserId: [search.userId],
      type: 'private',
    })
    if (data?.id) {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      Route.useNavigate()({
        to: '/$id',
        params: { id: data.id },
      })
    }
  }
  return (
    <div className="flex h-screen flex-col">
      <div className="bg-ui-secondary border-gray-500 text-white">
        <ChatHeader
          avatarUrl={search?.profileImage ?? undefined}
          name={search?.title}
          lastActive="2 hours ago"
        />
      </div>

      <main className="scrollbar flex-1 overflow-y-auto p-4"></main>

      <div className="w-full pt-2 pb-6">
        <div className="mx-auto max-w-3xl">
          <ChatBar onJustMessageSubmit={createNewConversation} />
        </div>
      </div>
    </div>
  )
}
