import { Paperclip, Send, Smile } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useEffect, useRef, useState } from 'react'
import type { SendMessage } from '@/hooks/useMessageHook'

interface ChatBarProp {
  onSubmit?: (message: SendMessage) => void
  onJustMessageSubmit?: (message: string) => void
  onTyping?: () => void
  onStopTyping?: () => void
  conversationId?: string
}

export default function ChatBar({
  onSubmit,
  onJustMessageSubmit,
  conversationId,
  onTyping,
  onStopTyping,
}: ChatBarProp) {
  const [message, setMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!message.trim()) return

    if (conversationId && onSubmit) {
      onSubmit({ conversationId, content: message })
    } else if (onJustMessageSubmit) {
      onJustMessageSubmit(message)
    }

    setMessage('')
  }

  useEffect(() => {
    if (!onTyping || !onStopTyping) return
    if (message) {
      onTyping()
    } else {
      onStopTyping()
    }
  }, [message, onTyping, onStopTyping])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex w-full gap-2">
      <div className="relative flex-grow">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-14 w-full rounded-full border-0 bg-[#303030] px-14 font-semibold shadow-2xl"
          placeholder="Send a message..."
        />
        <Button
          variant="invisible"
          className="group absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-0"
        >
          <Smile className="size-5 text-gray-400 transition-colors group-hover:text-pink-300" />
        </Button>
        <Button
          variant="invisible"
          className="group absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-0"
        >
          <Paperclip className="size-5 text-gray-400 transition-colors group-hover:text-pink-300" />
        </Button>
      </div>

      <Button
        className="h-14 w-14 rounded-full text-white hover:text-gray-300 focus-visible:ring-0"
        onClick={handleSubmit}
      >
        <Send className="!size-5" />
      </Button>
    </div>
  )
}
