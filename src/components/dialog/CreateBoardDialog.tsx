import NewBoardItem from '@/src/components/boards/NewBoardItem'
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
import { Field, FieldDescription } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Separator } from '@/src/components/ui/separator'
import { Switch } from '@/src/components/ui/switch'
import { Textarea } from '@/src/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/components/ui/tooltip'
import { IBoard, ITags } from '@/src/models'
import { BoardsService } from '@/src/service'
import { colorKeys, colorsArray, getColorByKey } from '@/src/shared/consts'
import { Check, X } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  onCreateBoard: (newBoard: IBoard) => void
}

export default function CreateBoardDialog({ onCreateBoard }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const [selectedColor, setSelectedColor] = useState<colorKeys>('purple')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [languageFrom, setLanguageFrom] = useState('')
  const [languageTo, setLanguageTo] = useState('')

  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState<ITags[]>([])

  function changeTags(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ') {
      e.preventDefault()
    }

    if (currentTag.trim().length > 0 && e.key === ' ') {
      setCurrentTag('')
      setTags([...tags, { id: tags.length, tag: currentTag.trim() }])
    }
  }

  function removeTag(tagId: number) {
    setTags(tags.filter(tag => tag.id !== tagId))
  }

  async function createBoard() {
    setIsOpen(false)

    try {
      const color = getColorByKey(selectedColor)?.code.split('#')[1]
      if (!color) {
        return
      }

      const enteredTags = tags.map(tag => tag.tag)

      const response = await BoardsService.createBoard({
        title,
        boardColor: color,
        description,
        tags: enteredTags,
        isPublic,
        languageFrom,
        languageTo,
      })

      onCreateBoard(response.data)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    }
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
        <div className="space-y-4">
          <Field>
            <Label>Board title</Label>
            <Input
              placeholder="Perfect English words"
              onChange={e => setTitle(e.target.value)}
            />
          </Field>
          <Separator />
          <Field>
            <Label>Board description</Label>
            <div className="relative">
              <Textarea
                placeholder="I love learning languages"
                onChange={e => setDescription(e.target.value)}
              />
              <p className="text-muted-foreground absolute right-0 bottom-0 -translate-x-2 -translate-y-1 text-xs">
                {`${description.length} / 1000`}
              </p>
            </div>
            <FieldDescription>Optional</FieldDescription>
          </Field>
          <Separator />
          <div className="flex items-center justify-between gap-x-4">
            <Field>
              <Label>Language from</Label>
              <Input
                placeholder="English"
                onChange={e => setLanguageFrom(e.target.value)}
              />
            </Field>
            <Field>
              <Label>Language to</Label>
              <Input
                placeholder="Japan"
                onChange={e => setLanguageTo(e.target.value)}
              />
            </Field>
          </div>
          <Separator />
          <div className="flex items-center gap-x-4">
            <Label>Private board</Label>
            <Switch
              className="bg-green-600"
              onCheckedChange={e => setIsPublic(!e.valueOf)}
            />
          </div>
          <Separator />
          <Field>
            <Label>Tags</Label>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="bg-primary/20 flex justify-center gap-x-2 rounded-lg pr-2 pl-2"
                >
                  <p className="w-[80%]">{tag.tag}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <X
                        className="hover:text-muted-foreground cursor-pointer"
                        onClick={() => removeTag(tag.id)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove tag</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
            <Input
              placeholder="Separated by a space"
              value={currentTag}
              onChange={e => setCurrentTag(e.target.value)}
              onKeyDown={e => changeTags(e)}
            />
            <FieldDescription>
              Optional. Maximum tags 5. Max length one tag 16 chars
            </FieldDescription>
            <FieldDescription
              className={`${tags.length > 5 && 'text-red-500'}`}
            >
              Using tags: {tags.length} / 5
            </FieldDescription>
          </Field>
          <Separator />
          <Field>
            <Label>Board color</Label>
            <div className="grid grid-cols-6 space-y-2">
              {colorsArray.map(color => (
                <div
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:opacity-90 ${selectedColor === color.key && 'border-2 border-white'}`}
                  style={{ backgroundColor: color.code }}
                >
                  {color.key === selectedColor && <Check />}
                </div>
              ))}
            </div>
          </Field>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => createBoard()}>Create board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
