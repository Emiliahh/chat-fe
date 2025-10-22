import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserSearch } from '@/interface/conversation'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'

export default function SearchChatCard(props: UserSearch) {
  const { hasConversation, id, name, profileImage, email } = props
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (hasConversation) {
      navigate({
        to: '/$id',
        params: { id },
      })
    } else {
      navigate({
        to: '/new',
        search: { userId: id, title: name, profileImage },
      })
    }
  }

  return (
    <div
      className={clsx(
        'group flex items-center justify-between gap-4 px-5 py-4',
        'cursor-pointer rounded-xl transition-colors hover:bg-neutral-800/60',
      )}
      onClick={handleNavigate}
      role="button"
      aria-label={`Open chat with ${name}`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={profileImage}
            alt={name}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="bg-neutral-600 text-base font-semibold text-white">
            {name?.charAt(0)?.toUpperCase() ?? '?'}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="max-w-[200px] truncate text-base font-semibold text-white">
            {name}
          </span>
          {email && (
            <span className="max-w-[200px] truncate text-sm text-neutral-400">
              {email}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
