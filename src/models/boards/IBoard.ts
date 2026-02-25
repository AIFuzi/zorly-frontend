export interface IBoard {
  id: string
  title: string
  description: string
  languageFrom: string
  languageTo: string
  isPublic: boolean
  tags: string[]
  totalWords: number
  boardColor: string
  createdAt: string
  updatedAt: string
}
