import CreateWordDialog from '@/src/components/dialog/CreateWordDialog'
import { Input } from '@/src/components/ui/input'
import { IWord } from '@/src/models'
import { Search } from 'lucide-react'

interface WordsParamsProps {
  boardId: string
  newWord: (word: IWord) => void
}

export default function WordsParams({ boardId, newWord }: WordsParamsProps) {
  return (
    <div className="flex items-center gap-x-4">
      <CreateWordDialog
        boardId={boardId}
        newWord={word => newWord(word)}
      />
      <div className="relative">
        <Input
          autoComplete="off"
          placeholder="Search words..."
        />
        <Search
          className="text-muted-foreground absolute top-0 right-0 -translate-x-2 translate-y-1.5"
          size={22}
        />
      </div>
    </div>
  )
}
