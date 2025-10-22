import { Pencil, User, Contact } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function AddMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-blue-500 p-0 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-blue-600 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
          <Pencil className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className="animate-in slide-in-from-bottom-2 mb-2 w-48 rounded-lg border border-white/10 bg-black/20 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl"
      >
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 transition-colors duration-150 hover:bg-white/10 focus:bg-white/10">
          <User className="h-4 w-4 text-white/60" />
          <span className="text-sm">New Message</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-white/90 transition-colors duration-150 hover:bg-white/10 focus:bg-white/10">
          <Contact className="h-4 w-4 text-white/60" />
          <span className="text-sm">New Group</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
