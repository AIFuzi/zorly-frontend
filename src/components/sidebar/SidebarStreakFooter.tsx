import { Flame } from 'lucide-react'

export default function SidebarStreakFooter() {
  return (
    <div className="bg-card rounded-xl border p-2">
      <div className="flex items-center gap-x-2">
        <Flame
          className="fill-[#ff8800] text-[#F97316]"
          size={36}
        />
        <div>
          <h1 className="text-primary text-xl font-semibold">Current streak</h1>
          <h2>12 DAYS</h2>
        </div>
      </div>
    </div>
  )
}
