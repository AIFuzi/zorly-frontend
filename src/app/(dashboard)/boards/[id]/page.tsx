import Container from '@/src/components/Container'
import EditWordsHeader from '@/src/components/words/EditWordsHeader'
import EditWordsPagination from '@/src/components/words/EditWordsPagination'
import WordsParams from '@/src/components/words/WordsParams'
import WordsTable from '@/src/components/words/WordsTable'
import WordWrapper from '@/src/components/words/WordWrapper'
import { BoardsService } from '@/src/service'
import { Metadata } from 'next'

interface PageProps {
  params: { id: string } | Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const response = await BoardsService.getOneBoard(id)

    return {
      title: `${response.data.title} | Zorly`,
    }
  } catch {
    return {
      title: 'Not found | Zorly',
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  let response

  try {
    response = await BoardsService.getOneBoard(id)
  } catch {
    return (
      <div>
        <h1>ERROR</h1>
      </div>
    )
  }

  return (
    <Container className="space-y-6">
      <EditWordsHeader title={response.data.title} />
      <WordWrapper boardId={response.data.id} />
      <EditWordsPagination />
    </Container>
  )
}
