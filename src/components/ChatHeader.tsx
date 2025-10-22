import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { Phone, Search, Video } from 'lucide-react'
import ChatDropDown from './ChatDropDown'
interface ChatHeaderProps {
  avatarUrl?: string
  name?: string
  lastActive?: string
}
export default function ChatHeader(props: ChatHeaderProps) {
  const { avatarUrl, name, lastActive } = props
  return (
    <div className="flex items-center justify-between px-5 py-2">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback className="bg-neutral-600 text-base font-semibold text-white">
            {name?.charAt(0)?.toUpperCase() ?? '?'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-400">Last active {lastActive} </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button className="h-12 w-12 rounded-full border-0 p-0 hover:bg-neutral-700 focus-visible:ring-0 [&_svg]:size-6">
          <Search className="!size-5" />
        </Button>
        <Button className="h-12 w-12 rounded-full border-0 p-0 hover:bg-neutral-700 focus-visible:ring-0 [&_svg]:size-6">
          <Phone className="!size-5" />
        </Button>
        <Button className="h-12 w-12 rounded-full border-0 p-0 hover:bg-neutral-700 focus-visible:ring-0 [&_svg]:size-6">
          <Video className="!size-5" />
        </Button>
        <ChatDropDown />
      </div>
    </div>
  )
}
