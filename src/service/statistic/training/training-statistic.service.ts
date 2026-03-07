import { api } from '@/src/api'

interface createStatistic {
  correctAnswers: number
  incorrectAnswers: number
  skippedAnswers: number
  trainingId: string
}

export class TrainingStatisticService {
  static async create(dto: createStatistic) {
    return api.post('/training-statistic/create', dto)
  }
}
