import ColorSelector from '@/src/components/dialog/create/ColorSelector'
import TagsInput from '@/src/components/dialog/create/TagsInput'
import { formIds } from '@/src/components/forms/forms.type'
import { Field, FieldDescription } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Separator } from '@/src/components/ui/separator'
import { Textarea } from '@/src/components/ui/textarea'
import { IBoard, ITags } from '@/src/models'
import { BoardsService } from '@/src/service'
import { CreateBoardDto } from '@/src/service/boards/dto/create-board.dto'
import { colorKeys, getColorByKey } from '@/src/shared/consts'
import { createBoardSchema, createBoardSchemaType } from '@/src/shemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CreateBoardProps {
  onCreateBoard: (board: IBoard) => void
}

export default function CreateBoardForm({ onCreateBoard }: CreateBoardProps) {
  const [color, setColor] = useState<colorKeys>('purple')
  const [tags, setTags] = useState<ITags[]>([])

  const form = useForm<createBoardSchemaType>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: '',
      description: '',
      languageFrom: '',
      languageTo: '',
    },
  })

  async function onSubmit(form: createBoardSchemaType) {
    try {
      const newBoard: CreateBoardDto = {
        title: form.title,
        description: form.description,
        languageFrom: form.languageFrom,
        languageTo: form.languageTo,
        isPublic: true,
        tags: tags.map(tag => tag.tag),
        boardColor: getColorByKey(color)!.code.split('#')[1],
      }

      const response = await BoardsService.createBoard(newBoard)

      toast.success('Success', {
        description: `Board ${form.title} create successfully`,
      })

      onCreateBoard(response.data)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id={formIds.create}
    >
      <div className="space-y-4">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label>Board title</Label>
              <Input
                {...field}
                id={field.name}
                placeholder="Perfect English words"
              />
            </Field>
          )}
        />
        <Separator />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label>Board description</Label>
              <div className="relative">
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="I love learning languages"
                />
                <p className="text-muted-foreground absolute right-0 bottom-0 -translate-x-2 -translate-y-1 text-xs">
                  {`${field.value!.length} / 1000`}
                </p>
              </div>
              <FieldDescription>Optional</FieldDescription>
            </Field>
          )}
        />
        <Separator />
        <div className="flex items-center justify-between gap-x-4">
          <Controller
            control={form.control}
            name="languageFrom"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label>Language from</Label>
                <Input
                  placeholder="Japan"
                  id={field.name}
                  {...field}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="languageTo"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label>Language to</Label>
                <Input
                  placeholder="Japan"
                  id={field.name}
                  {...field}
                />
              </Field>
            )}
          />
        </div>
        <Separator />
        <TagsInput onTagsChange={tag => setTags(tag)} />
        <Separator />
        <ColorSelector selectColor={c => setColor(c)} />
      </div>
    </form>
  )
}
