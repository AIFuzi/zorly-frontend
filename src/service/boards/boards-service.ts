import { api } from '@/src/api'
import { IBoard } from '@/src/models'
import { CreateBoardDto } from '@/src/service/boards/dto/create-board.dto'
import { AxiosResponse } from 'axios'

export class BoardsService {
  static async getBoards(): Promise<AxiosResponse<IBoard[]>> {
    return await api.get('/board')
  }

  static async deleteBoard(boardId: string) {
    return await api.delete(`/board/delete/${boardId}`)
  }

  static async createBoard(
    dto: CreateBoardDto,
  ): Promise<AxiosResponse<IBoard>> {
    return await api.post(`/board/create`, dto)
  }
}
