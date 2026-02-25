import { Button } from '@/src/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import { BookOpenText, Ellipsis, Pen, Trash } from 'lucide-react'

interface BoardActionPopoverProps {
  title: string
  id: string
  removeBoard: (boardId: string) => void
}

export default function BoardActionPopover({
  title,
  id,
  removeBoard,
}: BoardActionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis className="hover:text-muted-foreground cursor-pointer transition-colors" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Board actions</PopoverTitle>
          <PopoverDescription>Customize board {title}</PopoverDescription>
          <Button>
            <Pen /> Edit board info
          </Button>
          <Button>
            <BookOpenText /> Edit words
          </Button>
          <Button
            variant="destructive"
            onClick={() => removeBoard(id)}
          >
            <Trash /> Delete board
          </Button>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
