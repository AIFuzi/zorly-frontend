import BoardGrid from '@/src/components/boards/BoardGrid'
import BoardTitle from '@/src/components/boards/BoardTitle'
import Container from '@/src/components/Container'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Boards | Zorly',
  }
}

export default function BoardsPage() {
  return (
    <Container className="mt-4">
      <BoardTitle />
      <BoardGrid />
    </Container>
  )
}
