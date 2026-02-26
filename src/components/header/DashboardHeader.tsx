'use client'

import Container from '@/src/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { SidebarTrigger, useSidebar } from '@/src/components/ui/sidebar'
import { Switch } from '@/src/components/ui/switch'
import {
  ChevronDown,
  PanelLeft,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react'

interface HeaderProps {}

export default function DashboardHeader({}: HeaderProps) {
  const { open, toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-10 h-12 w-full">
      <div className="ml-2 flex h-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          {/*<SidebarTrigger className="hidden lg:block" />*/}
          <div
            className="hover:bg-primary/30 cursor-pointer rounded-lg border p-1.5 transition-colors"
            onClick={() => toggleSidebar()}
          >
            {open ? (
              <PanelRightOpen size={22} />
            ) : (
              <PanelRightClose size={22} />
            )}
          </div>
          {/*<div className="relative flex items-center">*/}
          {/*  <Switch />*/}
          {/*</div>*/}
        </div>
      </div>
    </header>
  )
}

/*

    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Avatar>
                <AvatarFallback>FC</AvatarFallback>
                <AvatarImage src={process.env.NEXT_PUBLIC_TEST_AVATAR_URL} />
              </Avatar>
              <h1>ProfileName</h1>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>


 */
