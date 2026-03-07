import BoardActionPopover from '@/src/components/boards/BoardActionPopover'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Label } from '@/src/components/ui/label'
import { Progress } from '@/src/components/ui/progress'
import { Slider } from '@/src/components/ui/slider'
import { IBoard, ITraining } from '@/src/models'
import { TrainingService } from '@/src/service'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Globe, LoaderCircle, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CSSProperties, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface BoardsItemProps {
  boardInfo: IBoard
  deleteBoard: (boardId: string) => void
}

export default function BoardsItem({
  boardInfo,
  deleteBoard,
}: BoardsItemProps) {
  const router = useRouter()

  const [isTrainingLoading, setIsTrainingLoading] = useState(false)
  const [notFinishedTraining, setNotFinishedTraining] = useState<ITraining>()

  const [isOpen, setIsOpen] = useState(false)
  const [hideWords, setHideWords] = useState<CheckedState>(false)
  const [shufWords, setShufWords] = useState<CheckedState>(false)
  const [wordsLimitValue, setWordsLimitValue] = useState([1])

  const accuracy = Math.floor(Math.random() * 100)

  async function goToTraining() {
    if (notFinishedTraining?.id) {
      router.push(
        `/training/${notFinishedTraining.id}?hidewords=${hideWords}&shuf=${shufWords}&limit=${wordsLimitValue}`,
      )

      return
    }

    setIsTrainingLoading(true)

    try {
      const response = await TrainingService.generateTraining(boardInfo.id)

      router.push(
        `/training/${response.data.id}?hidewords=${hideWords}&shuf=${shufWords}&limit=${wordsLimitValue}`,
      )
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    } finally {
      setIsTrainingLoading(false)
    }
  }

  async function getNotFinishedTraining() {
    setIsTrainingLoading(true)

    try {
      const response = await TrainingService.getNotFinishedTraining(
        boardInfo.id,
      )

      setNotFinishedTraining(response.data)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    } finally {
      setIsTrainingLoading(false)
    }
  }

  useEffect(() => {
    void getNotFinishedTraining()
  }, [])

  return (
    <div
      className="bg-card w-full cursor-default rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:border-(--boarder-color-hover)"
      style={
        {
          '--boarder-color-hover': `#${boardInfo.boardColor}50`,
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
          <BoardActionPopover
            removeBoard={() => deleteBoard(boardInfo.id)}
            id={boardInfo.id}
            title={boardInfo.title}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{boardInfo.title}</h1>
          <h3 className="text-muted-foreground text-sm font-light">
            {boardInfo.totalWords} words in boards
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
        <AlertDialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <AlertDialogTrigger asChild>
            <Button
              disabled={isTrainingLoading}
              // onClick={() => goToTraining()}
              onClick={() => setIsOpen(true)}
              className="bg-(--board-color) transition-colors hover:bg-(--board-color-hover)"
              style={
                {
                  '--board-color': `#${boardInfo.boardColor}`,
                  '--board-color-hover': `#${boardInfo.boardColor}CC`,
                } as CSSProperties
              }
            >
              {isTrainingLoading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  <span>Loading</span>
                </>
              ) : (
                <>
                  <Play />
                  <span>
                    {notFinishedTraining?.id
                      ? 'Continue training'
                      : 'Start training'}
                  </span>
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Start training</AlertDialogTitle>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h4>Words limit</h4>
                <h4 className="text-muted-foreground font-light">
                  {wordsLimitValue}
                </h4>
              </div>
              <Slider
                min={1}
                max={boardInfo.totalWords}
                value={wordsLimitValue}
                onValueChange={setWordsLimitValue}
                step={1}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Label>Hide words</Label>
              <Checkbox onCheckedChange={e => setHideWords(e)} />
            </div>
            <div className="flex items-center gap-x-2">
              <Label>Shuf words</Label>
              <Checkbox onCheckedChange={e => setShufWords(e)} />
            </div>
            <AlertDialogFooter>
              <Button onClick={() => goToTraining()}>Go to training</Button>
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
