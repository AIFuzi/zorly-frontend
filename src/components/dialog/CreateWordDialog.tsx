'use client'

import CreateWordForm from '@/src/components/forms/CreateWordForm'
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
import { IWord } from '@/src/models'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface CreateWordDialogProps {
  boardId: string
  newWord: (word: IWord) => void
}

export default function CreateWordDialog({
  boardId,
  newWord,
}: CreateWordDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus /> add words
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>Add words in board</DialogTitle>
          <DialogDescription>Add new word</DialogDescription>
        </DialogHeader>
        <CreateWordForm
          boardId={boardId}
          newWord={word => newWord(word)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form={formIds.addWord}
          >
            Add word
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
