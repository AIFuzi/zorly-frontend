import { api } from '@/src/api'
import { IGeneratedTraining, ITraining } from '@/src/models'
import { UpdateTrainingDto } from '@/src/service/training/dto'
import { AxiosResponse } from 'axios'

export class TrainingService {
  static async generateTraining(
    boardId: string,
  ): Promise<AxiosResponse<IGeneratedTraining>> {
    return api.post('/training/generate', { boardId })
  }

  static async getTraining(
    trainingId: string,
  ): Promise<AxiosResponse<ITraining>> {
    return api.get(`/training/${trainingId}`)
  }

  static async getNotFinishedTraining(
    boardId: string,
  ): Promise<AxiosResponse<ITraining>> {
    return api.get(`/training/not-finished/${boardId}`)
  }

  static async updateTraining(
    id: string,
    dto: UpdateTrainingDto,
  ): Promise<AxiosResponse<ITraining>> {
    return api.patch(`/training/${id}`, dto)
  }
}
