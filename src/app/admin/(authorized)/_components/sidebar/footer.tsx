"use client"

import { useLogout, useUser } from "@/hooks/use-auth"

import { LogOut, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarFooter } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const AdminSidebarFooter = () => {
  const user = useUser()
  const logout = useLogout()

  return (
    <SidebarFooter className='border-t border-border/40 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarFallback className='bg-blue-500'>{user?.name?.[0] || "N/A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{user?.name}</p>
            <p className='text-xs text-muted-foreground'>{user?.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='rounded-full p-2'>
              <ChevronDown className='h-4 w-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout.mutate()} disabled={logout.isPending}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  )
}
