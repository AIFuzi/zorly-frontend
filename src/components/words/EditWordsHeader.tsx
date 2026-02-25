import { Dot, MoveLeft } from 'lucide-react'
import Link from 'next/link'

interface EditWordsHeaderProps {
  title: string
}

export default function EditWordsHeader({ title }: EditWordsHeaderProps) {
  return (
    <div className="flex flex-col">
      <Link
        href="/boards"
        className="text-primary hover:text-primary/50 flex items-center gap-x-2 transition-colors"
      >
        <MoveLeft />
        <span>all boards</span>
      </Link>
      <h1 className="text-5xl font-bold">{title}</h1>
      <div className="flex">
        <h4 className="text-foreground/60 font-semibold">
          1.000 words vocabulary
        </h4>
        <Dot />
        <h4 className="text-primary font-semibold">85% overall mastery</h4>
      </div>
    </div>
  )
}
