import { z } from 'zod'

export const createBoardSchema = z.object({
  title: z.string().min(3).max(60),
  description: z.string().max(1000).optional(),
  languageFrom: z.string().min(3).max(10),
  languageTo: z.string().min(3).max(10),
})

export type createBoardSchemaType = z.infer<typeof createBoardSchema>
