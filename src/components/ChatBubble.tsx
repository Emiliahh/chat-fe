import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import clsx from 'clsx'

interface ChatBubbleProps {
  message: string
  avatarUrl?: string
  isUser?: boolean
  sendTime?: string
}

export default function ChatBubble({
  message,
  avatarUrl,
  isUser,
  sendTime,
}: ChatBubbleProps) {
  return (
    <div
      className={clsx(
        'mb-2 flex items-end gap-3',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser && avatarUrl && (
        <Avatar>
          <AvatarImage
            src={avatarUrl}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover"
          ></AvatarImage>
        </Avatar>
      )}

      <div
        className={clsx(
          'relative max-w-xs rounded-2xl px-4 py-2 break-words shadow',
          isUser
            ? 'rounded-br-sm bg-blue-500 text-white'
            : 'rounded-bl-sm bg-neutral-700 text-neutral-100',
        )}
      >
        {message}
        {sendTime && (
          <span className="ml-2 text-xs text-gray-400">{sendTime}</span>
        )}
      </div>
    </div>
  )
}
