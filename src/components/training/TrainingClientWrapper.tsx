'use client'

import QuestionBoard from '@/src/components/training/QuestionBoard'
import SessionProgress from '@/src/components/training/SessionProgress'
import { ITraining } from '@/src/models'
import { useState } from 'react'

interface TrainingClientWrapperProps {
  trainingData: ITraining
}

export default function TrainingClientWrapper({
  trainingData,
}: TrainingClientWrapperProps) {
  const [selectedAnswer, setSelectedAnswer] = useState(0)

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
      />
    </div>
  )
}
