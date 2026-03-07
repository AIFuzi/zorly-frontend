import Container from '@/src/components/Container'
import TrainingClientWrapper from '@/src/components/training/TrainingClientWrapper'
import { TrainingService } from '@/src/service'
import { Metadata } from 'next'

interface PageProps {
  params: { id: string } | Promise<{ id: string }>
  searchParams:
    | { hidewords: string; shuf: string; limit: number }
    | Promise<{ hidewords: string; shuf: string; limit: number }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Training | Zorly',
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { hidewords, shuf, limit } = await searchParams

  const response = await TrainingService.getTraining(id, limit)

  return (
    <Container>
      <div className="m-auto lg:w-2/4">
        <TrainingClientWrapper
          shuf={shuf}
          trainingData={response.data}
          hide={hidewords}
        />
      </div>
    </Container>
  )
}
