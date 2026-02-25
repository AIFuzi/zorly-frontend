import { GraduationCap } from 'lucide-react'

export default function SidebarLogoHeader() {
  return (
    <div className="hover:bg-primary/10 cursor-pointer rounded-xl p-2 transition-colors">
      <div className="flex items-center justify-between">
        <div className="bg-primary rounded-xl p-2">
          <GraduationCap size={28} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Zorly</h1>
          <h3 className="text-muted-foreground">Learn language words</h3>
        </div>
      </div>
    </div>
  )
}
