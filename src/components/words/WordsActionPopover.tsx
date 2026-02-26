import { Button } from '@/src/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import { IWord } from '@/src/models'
import { ChevronDown, CircleX, Pen } from 'lucide-react'

interface WordsActionPopoverProps {
  wordInfo: IWord
  onEditMode: () => void
}

export default function WordsActionPopover({
  onEditMode,
}: WordsActionPopoverProps) {
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
