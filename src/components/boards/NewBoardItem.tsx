import { Plus } from 'lucide-react'

interface NewBoardProps {
  addBoard: () => void
}

export default function NewBoardItem({ addBoard }: NewBoardProps) {
  return (
    <div
      className="hover:border-primary group w-full cursor-pointer rounded-xl border border-dashed p-4 transition-colors"
      onClick={() => addBoard()}
    >
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <div className="bg-card group-hover:bg-primary/20 text-primary rounded-full p-4 transition-colors">
          <Plus />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Add new board</h1>
          <h3 className="text-muted-foreground text-sm font-light">
            Import words or start from scratch
          </h3>
        </div>
      </div>
    </div>
  )
}
