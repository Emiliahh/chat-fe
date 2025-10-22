import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'

interface ChatBubbleSkeletonProps {
  isUser?: boolean
}

export function ChatBubbleSkeleton({ isUser }: ChatBubbleSkeletonProps) {
  return (
    <div
      className={clsx(
        'mb-2 flex items-end gap-3',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      )}

      <div
        className={clsx(
          'relative max-w-xs rounded-2xl px-4 py-2 break-words shadow',
          isUser
            ? 'rounded-br-sm bg-blue-500/10'
            : 'rounded-bl-sm bg-neutral-700/20',
        )}
      >
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="mt-1 ml-2 inline-block h-3 w-10" />
      </div>
    </div>
  )
}
