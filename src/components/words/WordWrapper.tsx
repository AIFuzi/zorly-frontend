'use client'

import WordsParams from '@/src/components/words/WordsParams'
import WordsTable from '@/src/components/words/WordsTable'
import { IWord } from '@/src/models'
import { useState } from 'react'

interface WordWrapperProps {
  boardId: string
}

export default function WordWrapper({ boardId }: WordWrapperProps) {
  const [newWord, setNewWord] = useState<IWord>()

  return (
    <>
      <WordsParams
        boardId={boardId}
        newWord={word => setNewWord(word)}
      />
      <WordsTable
        boardId={boardId}
        newWord={newWord!}
      />
    </>
  )
}
