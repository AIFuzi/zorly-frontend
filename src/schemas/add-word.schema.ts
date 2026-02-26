import { z } from 'zod'

export const addWordSchema = z.object({
  original: z.string().min(1),
  translate: z.string().min(1),
})

export type addWordSchemaType = z.infer<typeof addWordSchema>
