'use client'

import QuestionBoard from '@/src/components/training/QuestionBoard'
import SessionProgress from '@/src/components/training/SessionProgress'
import { ITraining } from '@/src/models'
import { useState } from 'react'

interface TrainingClientWrapperProps {
  trainingData: ITraining
  hide: string
  shuf: string
}

export default function TrainingClientWrapper({
  trainingData,
  hide,
  shuf,
}: TrainingClientWrapperProps) {
  const [selectedAnswer, setSelectedAnswer] = useState(
    trainingData.currentIssue,
  )

  function updateSelected(value: number) {
    setSelectedAnswer(value)
  }

  return (
    <div className="space-y-4">
      <SessionProgress
        trainingData={trainingData}
        currentAnswer={selectedAnswer}
      />
      <QuestionBoard
        trainingData={trainingData}
        onSelectedChange={value => updateSelected(value)}
        hideWords={hide === 'true'}
        shuf={shuf === 'true'}
      />
    </div>
  )
}
