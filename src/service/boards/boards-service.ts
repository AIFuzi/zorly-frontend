import { api } from '@/src/api'
import { IBoard } from '@/src/models'
import { AxiosResponse } from 'axios'

export class BoardsService {
  static async getBoards(): Promise<AxiosResponse<IBoard[]>> {
    return await api.get('/board')
  }

  static async deleteBoard(boardId: string) {
    return await api.delete(`/board/delete/${boardId}`)
  }
}
