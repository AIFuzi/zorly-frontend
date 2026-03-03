import { Progress } from '@/src/components/ui/progress'
import { ITraining } from '@/src/models'

interface SessionProgressProps {
  trainingData: ITraining
  currentAnswer: number
}

export default function SessionProgress({
  trainingData,
  currentAnswer,
}: SessionProgressProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-muted-foreground text-2xl font-semibold">
          Current session
        </h1>
        <h1 className="text-primary text-2xl font-semibold">
          {currentAnswer + 1} / {trainingData.board.words.length}
        </h1>
      </div>
      <Progress
        className="text-primary h-3"
        value={((currentAnswer + 1) / trainingData.board.words.length) * 100}
      />
    </div>
  )
}
