import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import clsx from 'clsx'

interface TypingIndicatorProps {
  avatarUrl?: string
}

export default function TypingIndicator({ avatarUrl }: TypingIndicatorProps) {
  return (
    <div className={clsx('mb-2 flex items-end gap-3', 'justify-start')}>
      {avatarUrl && (
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
          'relative flex max-w-xs items-center rounded-2xl px-4 py-2 shadow',
          'rounded-bl-sm bg-neutral-700 text-neutral-100',
        )}
      >
        <div className="flex h-5 items-center space-x-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 [animation-delay:0s]"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 [animation-delay:0.2s]"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  )
}
