'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ITraining } from '@/src/models'
import { TrainingService } from '@/src/service'
import { cn } from '@/src/shared/lib/utils'
import { CornerDownLeft, Lightbulb, SkipForward } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { toast } from 'sonner'

interface QuestionBoardProps {
  trainingData: ITraining
  onSelectedChange: (value: number) => void
}

type answer = 'default' | 'correct' | 'incorrect'

export default function QuestionBoard({
  trainingData,
  onSelectedChange,
}: QuestionBoardProps) {
  const [status, setStatus] = useState<answer>('default')
  const [answerValue, setAnswerValue] = useState('')

  const [statistic, setStatistic] = useState({
    correct: 0,
    incorrect: 0,
    skip: 0,
  })

  const [selectedAnswer, setSelectedAnswer] = useState(
    trainingData.currentIssue,
  )
  const [isTimeout, setIsTimeout] = useState(false)

  const trainingWords = trainingData.board.words

  const inputColorRing = {
    default: 'focus-visible:ring-primary focus-visible:border-primary',
    correct: 'focus-visible:ring-green-500 focus-visible:border-green-700',
    incorrect: 'focus-visible:ring-red-500 focus-visible:border-red-700',
  }[status]

  async function sendQuestion(key: KeyboardEvent<HTMLInputElement>) {
    if (key.key !== 'Enter' || isTimeout || answerValue.trim().length <= 0)
      return

    setIsTimeout(true)

    if (
      trainingWords[selectedAnswer].translate.toLowerCase() ===
      answerValue.toLowerCase()
    ) {
      setStatus('correct')
      setStatistic(prev => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setStatus('incorrect')
      setStatistic(prev => ({ ...prev, incorrect: prev.incorrect + 1 }))
    }

    await TrainingService.updateTraining(trainingData.id, {
      correctAnswers: statistic.correct,
      incorrectAnswers: statistic.incorrect,
      skippedAnswers: statistic.skip,
      currentIssue: selectedAnswer,
      isFinished: false,
    })

    setTimeout(() => {
      setIsTimeout(false)
      setStatus('default')
      setAnswerValue('')

      setSelectedAnswer(Math.min(selectedAnswer + 1, trainingWords.length - 1))
      onSelectedChange(selectedAnswer + 1)
    }, 1000)
  }

  return (
    <div className="bg-card w-full rounded-lg border">
      <div className="flex flex-col items-center justify-center space-y-12 pt-6 pb-6">
        <div className="bg-primary/20 rounded-full">
          <h1 className="text-primary pr-12 pl-12 text-xl">
            {trainingData.board.title}
          </h1>
        </div>
        <h1 className="text-7xl font-semibold">
          {trainingWords[selectedAnswer]?.original}
        </h1>
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative">
            <Input
              value={answerValue}
              onChange={e => setAnswerValue(e.target.value)}
              placeholder="Type the answer here..."
              autoComplete="off"
              className={cn(
                'border-primary/20 h-24 text-xl lg:w-96',
                inputColorRing,
              )}
              onKeyUp={e => sendQuestion(e)}
            />
            <CornerDownLeft className="text-primary absolute top-0 right-0 -translate-x-4 translate-y-9" />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="bg-primary/10 rounded-lg border p-2">
              <h4 className="text-muted-foreground">Enter</h4>
            </div>
            <h4 className="text-muted-foreground">to submit answer</h4>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="link"
            className="text-muted-foreground"
          >
            <Lightbulb />
            <span>show hint</span>
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground"
          >
            <SkipForward />
            <span>skip question</span>
          </Button>
        </div>
        <div className="text-muted-foreground flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <h4>{statistic.correct} Correct</h4>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-2 w-2 rounded-full bg-red-600" />
            <h4>{statistic.incorrect} Incorrect</h4>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-primary h-2 w-2 rounded-full" />
            <h4>{statistic.skip} Skip</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
