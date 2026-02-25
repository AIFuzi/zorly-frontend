import NewBoardItem from '@/src/components/boards/NewBoardItem'
import CreateBoardForm from '@/src/components/forms/CreateBoardForm'
import { formIds } from '@/src/components/forms/forms.type'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { IBoard } from '@/src/models'
import { useState } from 'react'

interface Props {
  onCreateBoard: (newBoard: IBoard) => void
}

export default function CreateBoardDialog({ onCreateBoard }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  function boardCreated(board: IBoard) {
    setIsOpen(false)
    onCreateBoard(board)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <NewBoardItem addBoard={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
          <DialogDescription>
            Make your perfect board for learning languages
          </DialogDescription>
        </DialogHeader>
        <CreateBoardForm onCreateBoard={board => boardCreated(board)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form={formIds.create}
          >
            Create board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
