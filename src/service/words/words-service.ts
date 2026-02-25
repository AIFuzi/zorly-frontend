import { api } from '@/src/api'
import { IWord } from '@/src/models'
import { AxiosResponse } from 'axios'

export class WordsService {
  static async getWordsByBoardId(
    boardId: string,
  ): Promise<AxiosResponse<IWord[]>> {
    return await api.get('/word', {
      params: {
        boardId,
      },
    })
  }
}
