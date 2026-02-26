import { formIds } from '@/src/components/forms/forms.type'
import { Field, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { IWord } from '@/src/models'
import { addWordSchema, addWordSchemaType } from '@/src/schemas'
import { WordsService } from '@/src/service/words/words-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


interface CreateWordFormProps {
  boardId: string
  newWord: (word: IWord) => void
}

export default function CreateWordForm({
  boardId,
  newWord,
}: CreateWordFormProps) {
  const form = useForm<addWordSchemaType>({
    resolver: zodResolver(addWordSchema),
    defaultValues: {
      original: '',
      translate: '',
    },
  })

  async function onSubmit(data: addWordSchemaType) {
    try {
      const response = await WordsService.createWord(
        data.original,
        data.translate,
        boardId,
      )

      newWord(response.data)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    } finally {
      form.reset()
    }
  }

  return (
    <form
      id={formIds.addWord}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Controller
        control={form.control}
        name="original"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Original word</FieldLabel>
            <Input
              {...field}
              id={field.name}
              autoComplete="off"
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="translate"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Word translate</FieldLabel>
            <Input
              {...field}
              id={field.name}
              autoComplete="off"
            />
          </Field>
        )}
      />
    </form>
  )
}
