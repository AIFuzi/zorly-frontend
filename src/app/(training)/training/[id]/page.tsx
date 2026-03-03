import Container from '@/src/components/Container'
import TrainingClientWrapper from '@/src/components/training/TrainingClientWrapper'
import { TrainingService } from '@/src/service'
import { Metadata } from 'next'

interface PageProps {
  params: { id: string } | Promise<{ id: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Training | Zorly',
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  const response = await TrainingService.getTraining(id)

  return (
    <Container>
      <div className="m-auto lg:w-2/4">
        <TrainingClientWrapper trainingData={response.data} />
      </div>
    </Container>
  )
}
