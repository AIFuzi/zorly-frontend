import {
  ChartNoAxesColumn,
  LayoutDashboard,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'

export const sidebarMainItems = [
  {
    id: 1,
    title: 'Boards',
    url: 'boards',
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: 'Statistics',
    url: 'stats',
    icon: ChartNoAxesColumn,
  },
  {
    id: 3,
    title: 'Profile',
    url: 'profile',
    icon: UserIcon,
  },
  {
    id: 4,
    title: 'Settings',
    url: 'settings',
    icon: SettingsIcon,
  },
]
