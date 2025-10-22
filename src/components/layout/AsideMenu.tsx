import { User, Contact, Settings, LogOut, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
const menuItems = [
  { label: 'Profile', href: '#', icon: User },
  { label: 'Contact', href: '#', icon: Contact },
]
const actionItems = [
  { label: 'Settings', href: '#', icon: Settings },
  { label: 'Sign Out', href: '#', icon: LogOut, danger: true },
]
export default function AsideMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center rounded-full border-0 p-3 transition-all duration-200 hover:scale-105 hover:bg-neutral-700/80 focus-visible:ring-0 focus-visible:ring-offset-0">
        <Menu className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="mt-1 w-64 animate-spin rounded-md border border-white/10 bg-black/20 p-2 font-medium text-white shadow-2xl shadow-black/60 backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-white/80">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-white/20" />

        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <DropdownMenuItem
              key={item.label}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-white/10 focus:bg-white/10"
            >
              <IconComponent className="h-4 w-4 text-white/60" />
              <span className="text-sm text-white/90">{item.label}</span>
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator className="my-2 bg-white/20" />

        {actionItems.map((item) => {
          const IconComponent = item.icon
          return (
            <DropdownMenuItem
              key={item.label}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 ${
                item.danger
                  ? 'hover:bg-red-500/20 hover:text-red-300 focus:bg-red-500/20 focus:text-red-300'
                  : 'hover:bg-white/10 focus:bg-white/10'
              }`}
            >
              <IconComponent
                className={`h-4 w-4 ${
                  item.danger ? 'text-red-400' : 'text-white/60'
                }`}
              />
              <span
                className={`text-sm ${
                  item.danger ? 'text-red-300' : 'text-white/90'
                }`}
              >
                {item.label}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
