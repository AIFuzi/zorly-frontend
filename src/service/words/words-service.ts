import { api } from '@/src/api'
import { IWord } from '@/src/models'
import { AxiosResponse } from 'axios'

export class WordsService {
  static async createWord(
    original: string,
    translate: string,
    boardId: string,
  ): Promise<AxiosResponse<IWord>> {
    return api.post('/word/create', {
      original,
      translate,
      boardId,
    })
  }

  static async getWordsByBoardId(
    boardId: string,
  ): Promise<AxiosResponse<IWord[]>> {
    return await api.get('/word', {
      params: {
        boardId,
      },
    })
  }

  static async deleteWord(wordId: string): Promise<AxiosResponse<boolean>> {
    return api.delete(`/word/${wordId}`)
  }

  static async updateWordStats(id: string, isCorrect: boolean) {
    return api.patch(`/word/${id}`, { isCorrect })
  }
}
