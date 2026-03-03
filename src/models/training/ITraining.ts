import { IBoardWords } from '@/src/models'

export interface ITraining {
  id: string
  boardId: string
  board: IBoardWords
  correctAnswers: number
  incorrectAnswers: number
  skippedAnswers: number
  currentIssue: number
  isFinished: boolean
}
