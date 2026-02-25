import { Field, FieldDescription } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/components/ui/tooltip'
import { ITags } from '@/src/models'
import { X } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'

interface TagsInputProps {
  onTagsChange: (tags: ITags[]) => void
}

export default function TagsInput({ onTagsChange }: TagsInputProps) {
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState<ITags[]>([])

  function changeTags(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ') {
      e.preventDefault()
    }

    if (currentTag.trim().length > 0 && e.key === ' ') {
      setCurrentTag('')
      setTags([...tags, { id: tags.length, tag: currentTag.trim() }])
      onTagsChange([...tags, { id: tags.length, tag: currentTag.trim() }])
    }
  }

  function removeTag(tagId: number) {
    setTags(tags.filter(tag => tag.id !== tagId))
  }

  return (
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
      <FieldDescription className={`${tags.length > 5 && 'text-red-500'}`}>
        Using tags: {tags.length} / 5
      </FieldDescription>
    </Field>
  )
}
