import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

interface ChatCardProps {
  title: string
  id: string
  isActive?: boolean
  avatar?: string
  lastMessage?: string
  timestamp?: string
}

export default function ChatCard(props: ChatCardProps) {
  const { title, avatar, lastMessage, timestamp, isActive, id } = props
  return (
    <Link to="/$id" params={{ id }}>
      <div
        className={clsx(
          'group flex items-center justify-between gap-4 px-5 py-4',
          'cursor-pointer rounded-xl',
          // add trasition
          isActive
            ? 'bg-blue-600/80 shadow-md transition-all duration-150'
            : 'hover:bg-neutral-800/60',
        )}
        role="button"
        aria-label={`Open chat with ${title}`}
        title={title}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={avatar}
              alt={title}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-neutral-600 text-base font-semibold text-white">
              {title?.charAt(0)?.toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="max-w-[200px] truncate text-base font-semibold text-white">
                {title}
              </span>
            </div>
            <span className="max-w-[260px] truncate text-sm text-neutral-300">
              {lastMessage ?? ' '}
            </span>
          </div>
        </div>
        <div className="ml-3 flex shrink-0 flex-col items-end">
          <span className="text-xs font-medium text-neutral-400">
            {timestamp}
          </span>
        </div>
      </div>
    </Link>
  )
}
