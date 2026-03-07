import { formIds } from '@/src/components/forms/forms.type'
import { Field, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { IWord } from '@/src/models'
import { addWordSchema, addWordSchemaType } from '@/src/schemas'
import { WordsService } from '@/src/service'
import { zodResolver } from '@hookform/resolvers/zod'
import { forEach } from 'eslint-config-next'
import { useState } from 'react'
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
    const la = data.translate.split('%=%')
    la.map(async ls => {
      const le = ls.split(';')

      try {
        const response = await WordsService.createWord(le[0], le[1], boardId)

        newWord(response.data)
      } catch (e) {
        if (e instanceof Error) {
          toast.error('Error', { description: e.message })
        }
      } finally {
        form.reset()
      }
    })

    // console.log(la)

    // try {
    //   const response = await WordsService.createWord(
    //     data.original,
    //     data.translate,
    //     boardId,
    //   )
    //
    //   newWord(response.data)
    // } catch (e) {
    //   if (e instanceof Error) {
    //     toast.error('Error', { description: e.message })
    //   }
    // } finally {
    //   form.reset()
    // }
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
      {/*<Controller*/}
      {/*  control={form.control}*/}
      {/*  name="translate"*/}
      {/*  render={({ field, fieldState }) => (*/}
      {/*    <Field data-invalid={fieldState.invalid}>*/}
      {/*      <FieldLabel>Word translate</FieldLabel>*/}
      {/*      <Input*/}
      {/*        {...field}*/}
      {/*        id={field.name}*/}
      {/*        autoComplete="off"*/}
      {/*      />*/}
      {/*    </Field>*/}
      {/*  )}*/}
      {/*/>*/}
      <Controller
        control={form.control}
        name="translate"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Word translate</FieldLabel>
            <Textarea
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
