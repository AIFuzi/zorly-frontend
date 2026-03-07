'use client'

import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { ITraining } from '@/src/models'
import {
  TrainingService,
  TrainingStatisticService,
  WordsService,
} from '@/src/service'
import { cn } from '@/src/shared/lib/utils'
import { CheckedState } from '@radix-ui/react-checkbox'
import { CornerDownLeft, Lightbulb, SkipForward } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useEffect, useState } from 'react'
import { bool } from 'sharp'
import { toast } from 'sonner'

interface QuestionBoardProps {
  trainingData: ITraining
  onSelectedChange: (value: number) => void
  hideWords: boolean
  shuf: boolean
}

type answer = 'default' | 'correct' | 'incorrect'

export default function QuestionBoard({
  trainingData,
  onSelectedChange,
  hideWords,
  shuf,
}: QuestionBoardProps) {
  const router = useRouter()

  const [status, setStatus] = useState<answer>('default')
  const [answerValue, setAnswerValue] = useState('')

  const [statistic, setStatistic] = useState({
    correct: trainingData.correctAnswers,
    incorrect: trainingData.incorrectAnswers,
    skip: trainingData.skippedAnswers,
  })

  const [selectedAnswer, setSelectedAnswer] = useState(
    trainingData.currentIssue,
  )
  const [isTimeout, setIsTimeout] = useState(false)
  const [drawHint, setDrawHint] = useState(false)

  // const [drawWords, setDrawWords] = useState<CheckedState>(false)

  const trainingWords = trainingData.board.words

  const inputColorRing = {
    default: 'focus-visible:ring-primary focus-visible:border-primary',
    correct: 'focus-visible:ring-green-500 focus-visible:border-green-700',
    incorrect: 'focus-visible:ring-red-500 focus-visible:border-red-700',
  }[status]

  function handleHintKey(key: KeyboardEvent<HTMLInputElement>) {
    if (key.key === 'Tab') {
      key.preventDefault()

      setDrawHint(true)
    }

    if (key.key === 'Alt') {
      key.preventDefault()

      speakWord()
    }
  }

  async function sendQuestion(key: KeyboardEvent<HTMLInputElement>) {
    if (key.key !== 'Enter' || isTimeout || answerValue.trim().length <= 0)
      return

    setIsTimeout(true)

    if (
      (!shuf &&
        trainingWords[selectedAnswer].translate.trim().toLowerCase() ===
          answerValue.trim().toLowerCase()) ||
      (shuf &&
        trainingWords[selectedAnswer].original.trim().toLowerCase() ===
          answerValue.trim().toLowerCase())
    ) {
      await WordsService.updateWordStats(trainingWords[selectedAnswer].id, true)

      setStatus('correct')
      setStatistic(prev => ({
        ...prev,
        correct: prev.correct + 1,
      }))
    } else {
      await WordsService.updateWordStats(
        trainingWords[selectedAnswer].id,
        false,
      )

      setDrawHint(true)

      setStatus('incorrect')
      setStatistic(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }))
    }

    setTimeout(async () => {
      setIsTimeout(false)
      setStatus('default')
      setAnswerValue('')
      setDrawHint(false)

      setSelectedAnswer(Math.min(selectedAnswer + 1, trainingWords.length - 1))

      await handleAnswer()

      onSelectedChange(selectedAnswer + 1)
    }, 1000)
  }

  async function skipQuestion() {
    setStatistic(prevState => ({ ...prevState, skip: prevState.skip + 1 }))

    await handleAnswer()

    setSelectedAnswer(selectedAnswer + 1)

    onSelectedChange(selectedAnswer + 1)
  }

  async function handleAnswer() {
    if (selectedAnswer == trainingWords.length - 1) {
      // router.refresh()

      router.push('/boards')

      // try {
      //   const response = await TrainingStatisticService.create({
      //     correctAnswers: statistic.correct,
      //     incorrectAnswers: statistic.incorrect,
      //     skippedAnswers: statistic.skip,
      //     trainingId: trainingData.id,
      //   })
      //
      //   router.push(`statistics/${response.data.id}`)
      // } catch (e) {
      //   if (e instanceof Error) {
      //     toast.error('Error', { description: e.message })
      //   }
      // }
    }
  }

  async function handleUpdate() {
    await TrainingService.updateTraining(trainingData.id, {
      correctAnswers: statistic.correct,
      incorrectAnswers: statistic.incorrect,
      skippedAnswers: statistic.skip,
      currentIssue: selectedAnswer,
      isFinished: selectedAnswer >= trainingWords.length - 1,
    })
  }

  function speakWord() {
    if (!window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(
      !shuf
        ? trainingWords[selectedAnswer]?.original
        : trainingWords[selectedAnswer].translate,
    )
    utterance.lang = !shuf
      ? trainingData.board.languageFrom
      : trainingData.board.languageTo
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    void handleUpdate()
    speakWord()
  }, [selectedAnswer])

  return (
    <>
      {/*<TrainingStatisticDialog />*/}
      <div className="bg-card w-full rounded-lg border">
        <div className="flex flex-col items-center justify-center space-y-12 pt-6 pb-6">
          <div className="bg-primary/20 rounded-full">
            <h1 className="text-primary pr-12 pl-12 text-xl">
              {trainingData.board.title}
            </h1>
          </div>
          <h1 className={`text-7xl font-semibold ${hideWords && 'hidden'}`}>
            {!shuf
              ? trainingWords[selectedAnswer]?.original
              : trainingWords[selectedAnswer].translate}
          </h1>
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex flex-col items-center gap-y-4">
              <div className="relative">
                <Input
                  autoFocus={true}
                  value={answerValue}
                  onChange={e => setAnswerValue(e.target.value)}
                  placeholder="Type the answer here..."
                  autoComplete="off"
                  className={cn(
                    'border-primary/20 h-24 text-xl lg:w-96',
                    inputColorRing,
                  )}
                  onKeyUp={e => sendQuestion(e)}
                  onKeyDown={e => handleHintKey(e)}
                />
                <CornerDownLeft className="text-primary absolute top-0 right-0 -translate-x-4 translate-y-9" />
              </div>
              <h1 className={`text-lg ${!drawHint && 'hidden'}`}>
                <span className="text-muted-foreground">Correct answer: </span>
                {shuf
                  ? trainingWords[selectedAnswer]?.original
                  : trainingWords[selectedAnswer].translate}
              </h1>
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
              onClick={() => setDrawHint(true)}
              variant="link"
              className="text-muted-foreground"
            >
              <Lightbulb />
              <span>show hint</span>
            </Button>
            <Button
              // onClick={() => skipQuestion()}
              variant="link"
              className="text-muted-foreground"
            >
              <SkipForward />
              <span>skip question</span>
            </Button>
            {/*<div className="flex items-center gap-x-2">*/}
            {/*  <Checkbox*/}
            {/*    className="border-primary"*/}
            {/*    onCheckedChange={e => setDrawWords(e)}*/}
            {/*  />*/}
            {/*  <Label>Hide words</Label>*/}
            {/*</div>*/}
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
    </>
  )
}
