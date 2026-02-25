'use client'

import BoardsItem from '@/src/components/boards/BoardsItem'
import BoardSkeleton from '@/src/components/boards/BoardSkeleton'
import NewBoardItem from '@/src/components/boards/NewBoardItem'
import CreateBoardDialog from '@/src/components/dialog/CreateBoardDialog'
import { IBoard } from '@/src/models'
import { BoardsService } from '@/src/service'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BoardGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const [boards, setBoards] = useState<IBoard[]>([])

  async function getBoards() {
    setIsLoading(true)

    try {
      const response = await BoardsService.getBoards()
      setBoards(response.data)

      console.log(response.data)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function removeBoard(boardId: string) {
    try {
      await BoardsService.deleteBoard(boardId)

      toast.success('Success', {
        description: `Board successfully deleted.`,
      })

      setBoards(boards.filter(b => b.id !== boardId))
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    }
  }

  function onCreateBoard(board: IBoard) {
    setBoards(prevState => [...prevState, board])
  }

  useEffect(() => {
    void getBoards()
  }, [])

  return (
    <div className="mt-2 flex grid-cols-6 flex-col gap-6 lg:grid">
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <BoardSkeleton key={index} />
        ))
      ) : (
        <>
          {boards.map(board => (
            <BoardsItem
              key={board.id}
              boardInfo={board}
              deleteBoard={() => removeBoard(board.id)}
            />
          ))}
          <CreateBoardDialog
            onCreateBoard={newBoard => onCreateBoard(newBoard)}
          />
          {/*<NewBoardItem addBoard={() => console.log('add board')} />*/}
        </>
      )}
    </div>
  )
}
