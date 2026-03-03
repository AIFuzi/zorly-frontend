import { IBoard, IWord } from '@/src/models'

export interface IBoardWords extends IBoard {
  words: IWord[]
}
