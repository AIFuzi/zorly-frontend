import { Button } from '@/src/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import { IWord } from '@/src/models'
import { WordsService } from '@/src/service'
import { ChevronDown, CircleX, Pen } from 'lucide-react'
import { toast } from 'sonner'

interface WordsActionPopoverProps {
  wordInfo: IWord
  onEditMode: () => void
  onDelete: (id: string) => void
}

export default function WordsActionPopover({
  onEditMode,
  wordInfo,
  onDelete,
}: WordsActionPopoverProps) {
  async function deleteWord() {
    try {
      await WordsService.deleteWord(wordInfo.id)

      onDelete(wordInfo.id)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-37.5 space-y-2">
        <Button
          className="w-full"
          onClick={() => onEditMode()}
        >
          <Pen />
          <span>edit word</span>
        </Button>
        <Button
          onClick={() => deleteWord()}
          variant="destructive"
          className="w-full"
        >
          <CircleX />
          <span>remove word</span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
