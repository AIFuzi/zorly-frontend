import Container from '@/src/components/Container'
import { Metadata } from 'next'

interface PageProps {}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Statistics | Zorly',
  }
}

export default function TrainingStatisticPage({}: PageProps) {
  return <Container>Training stats</Container>
}
