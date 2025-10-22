import {
  EllipsisVertical,
  Info,
  MessageSquare,
  VolumeX,
  Settings,
  UserMinus,
  Trash2,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function ChatDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 w-10 rounded-full border-0 p-0 hover:bg-neutral-700 focus-visible:ring-0">
          <EllipsisVertical className="!size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="mt-3 min-w-[200px] rounded-lg border-0 bg-neutral-800/95 p-2 text-neutral-100 shadow-2xl backdrop-blur-md"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-neutral-700/50">
          <Info className="h-4 w-4" />
          <span className="text-sm">View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-neutral-700/50">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">Search Messages</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-neutral-700/50">
          <VolumeX className="h-4 w-4" />
          <span className="text-sm">Mute Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-neutral-600/50" />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-neutral-700/50">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Chat Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-neutral-600/50" />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-500/20 focus:text-red-400">
          <UserMinus className="h-4 w-4" />
          <span className="text-sm">Block User</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-500/20 focus:text-red-400">
          <Trash2 className="h-4 w-4" />
          <span className="text-sm">Delete Chat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
