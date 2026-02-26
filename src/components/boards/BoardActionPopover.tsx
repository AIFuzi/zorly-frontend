import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/components/ui/alert-dialog'
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
import Link from 'next/link'
import { useState } from 'react'

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
  const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState(false)

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
            <Link
              href={`/src/app/(dashboard)/boards/${id}`}
              className="flex items-center gap-x-2"
            >
              <BookOpenText /> Edit words
            </Link>
          </Button>
          <AlertDialog
            open={isOpenRemoveDialog}
            onOpenChange={setIsOpenRemoveDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to delete the board?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <Button
                  className="bg-primary/40 hover:bg-primary/70"
                  onClick={() => setIsOpenRemoveDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => removeBoard(id)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            variant="destructive"
            onClick={() => setIsOpenRemoveDialog(!isOpenRemoveDialog)}
          >
            <Trash /> Delete board
          </Button>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
