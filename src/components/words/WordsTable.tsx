'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Skeleton } from '@/src/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import WordsActionPopover from '@/src/components/words/WordsActionPopover'
import { IWord } from '@/src/models'
import { WordsService } from '@/src/service/words/words-service'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface WordsTableProps {
  boardId: string
  newWord: IWord
}

export default function WordsTable({ boardId, newWord }: WordsTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [words, setWords] = useState<IWord[]>([])

  const [isEditMode, setIsEditMode] = useState(false)

  async function getWords() {
    setIsLoading(true)

    try {
      const response = await WordsService.getWordsByBoardId(boardId)
      setWords(response.data)
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', { description: e.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void getWords()
  }, [])

  useEffect(() => {
    setWords(prev => [...prev, newWord])
  }, [newWord])

  return (
    <Table className="bg-card">
      <TableHeader className="bg-primary/60">
        <TableRow>
          {isLoading ? (
            <TableHead></TableHead>
          ) : (
            <>
              <TableHead>WORDS</TableHead>
              <TableHead>TRANSLATE</TableHead>
              <TableHead>ACCURACY (%)</TableHead>
              <TableHead>TIMES SHOWN</TableHead>
              <TableHead>CORRECT COUNT</TableHead>
              <TableHead>WRONG COUNT</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-8 rounded-lg" />
                </TableCell>
              </TableRow>
            ))
          : words.map(word => (
              <TableRow key={word.id}>
                <TableCell className="text-lg font-light">
                  {isEditMode ? (
                    <Input
                      className="border-primary/30"
                      value={word.original}
                    />
                  ) : (
                    <span>{word.original}</span>
                  )}
                </TableCell>
                <TableCell className="text-lg font-light">
                  {isEditMode ? (
                    <Input
                      className="border-primary/30"
                      value={word.translate}
                    />
                  ) : (
                    <span>{word.translate}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-18 rounded-full bg-green-600/40 text-center">
                    <h4 className="text-green-400">98%</h4>
                  </div>
                </TableCell>
                <TableCell className="text-lg font-light">
                  {word.shownCount}
                </TableCell>
                <TableCell className="text-lg font-light">
                  {word.correctCount}
                </TableCell>
                <TableCell className="text-lg font-light">
                  {word.wrongCount}
                </TableCell>
                <TableCell className="text-right">
                  {isEditMode ? (
                    <Button onClick={() => setIsEditMode(false)}>Apply</Button>
                  ) : (
                    <WordsActionPopover
                      wordInfo={word}
                      onEditMode={() => setIsEditMode(true)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
