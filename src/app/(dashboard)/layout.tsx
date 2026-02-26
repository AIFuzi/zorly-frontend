import DashboardHeader from '@/src/components/header/DashboardHeader'
import UserSidebar from '@/src/components/sidebar/UserSidebar'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <UserSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
