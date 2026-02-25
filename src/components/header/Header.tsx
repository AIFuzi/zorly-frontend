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
import { SidebarTrigger } from '@/src/components/ui/sidebar'
import { ChevronDown } from 'lucide-react'

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className="bg-sidebar/70 sticky top-0 z-10 h-12 w-full border-b backdrop-blur-sm">
      <div className="m-auto flex h-full w-[90%] items-center justify-between">
        <SidebarTrigger className="hidden lg:block" />
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
      </div>
    </header>
  )
}
