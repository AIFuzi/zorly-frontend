'use client'

import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import { IWord } from '@/src/models'
import { WordsService } from '@/src/service/words/words-service'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface WordsTableProps {
  boardId: string
}

export default function WordsTable({ boardId }: WordsTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [words, setWords] = useState<IWord[]>([])

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
                  {word.original}
                </TableCell>
                <TableCell className="text-lg font-light">
                  {word.translate}
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
                  <Button variant="ghost">
                    <ChevronDown />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
