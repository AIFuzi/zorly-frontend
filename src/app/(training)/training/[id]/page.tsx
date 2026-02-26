import Container from '@/src/components/Container'
import QuestionBoard from '@/src/components/training/QuestionBoard'
import SessionProgress from '@/src/components/training/SessionProgress'
import { Metadata } from 'next'

interface PageProps {
  params: { id: string } | Promise<{ id: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Training | Zorly',
  }
}

export default function Page({}: PageProps) {
  return (
    <Container>
      <div className="m-auto lg:w-2/4">
        <div className="space-y-4">
          <SessionProgress />
          <QuestionBoard />
        </div>
      </div>
    </Container>
  )
}
