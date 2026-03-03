export interface UpdateTrainingDto {
  correctAnswers: number
  incorrectAnswers: number
  skippedAnswers: number
  currentIssue: number
  isFinished: boolean
}
