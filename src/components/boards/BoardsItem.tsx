import { Button } from '@/src/components/ui/button'
import { Progress } from '@/src/components/ui/progress'
import { IBoard } from '@/src/models'
import { Ellipsis, Globe, Play } from 'lucide-react'
import { CSSProperties } from 'react'

interface BoardsItemProps {
  boardInfo: IBoard
}

export default function BoardsItem({ boardInfo }: BoardsItemProps) {
  // eslint-disable-next-line react-hooks/purity
  const accuracy = Math.floor(Math.random() * 100)

  return (
    <div
      className="bg-secondary w-full cursor-default rounded-xl border p-4 transition-colors hover:border-(--boarder-color-hover)"
      style={
        {
          '--boarder-color-hover': `#${boardInfo.boardColor}CC`,
        } as CSSProperties
      }
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div
            className="bg-primary/20 rounded-lg p-2"
            style={{ backgroundColor: `#${boardInfo.boardColor}33` }}
          >
            <Globe
              className="text-primary"
              style={{ color: `#${boardInfo.boardColor}` }}
            />
          </div>
          <Button variant={'ghost'}>
            <Ellipsis />
          </Button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{boardInfo.title}</h1>
          <h3 className="text-muted-foreground text-sm font-light">
            0 words in boards
          </h3>
        </div>
        <div className="flex min-h-6 items-center gap-x-1">
          {boardInfo.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-primary/20 text-primary rounded-full p-1 pr-2 pl-2 text-xs"
              style={{
                backgroundColor: `#${boardInfo.boardColor}33`,
                color: `#${boardInfo.boardColor}`,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-xs font-semibold">
              Accuracy
            </h3>
            <h3
              className="text-primary text-xs font-semibold"
              style={{ color: `#${boardInfo.boardColor}` }}
            >
              {accuracy}%
            </h3>
          </div>
          <Progress
            value={accuracy}
            style={{
              color: `#${boardInfo.boardColor}`,
              backgroundColor: `#${boardInfo.boardColor}33`,
            }}
          />
        </div>
        <Button
          className="bg-(--board-color) transition-colors hover:bg-(--board-color-hover)"
          style={
            {
              '--board-color': `#${boardInfo.boardColor}`,
              '--board-color-hover': `#${boardInfo.boardColor}CC`,
            } as CSSProperties
          }
        >
          <Play /> Train
        </Button>
      </div>
    </div>
  )
}
