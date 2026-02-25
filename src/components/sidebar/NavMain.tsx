'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    id: number
  }[]
}

export function NavMain({ items }: Props) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map(item => (
            <Link
              href={item.url}
              key={item.title}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={
                    item.url === pathname.split('/')[1]
                      ? 'bg-primary'
                      : 'bg-none'
                  }
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
