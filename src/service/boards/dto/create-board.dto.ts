export interface CreateBoardDto {
  title: string
  description: string
  isPublic: boolean
  languageFrom: string
  languageTo: string
  tags: string[]
  boardColor: string
}
