'use client'

import { NavMain } from '@/src/components/sidebar/NavMain'
import { sidebarMainItems } from '@/src/components/sidebar/sidebar-items'
import SidebarLogoHeader from '@/src/components/sidebar/SidebarLogoHeader'
import SidebarStreakFooter from '@/src/components/sidebar/SidebarStreakFooter'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/src/components/ui/sidebar'

export default function UserSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarLogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
          <NavMain items={sidebarMainItems} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarStreakFooter />
      </SidebarFooter>
    </Sidebar>
  )
}
