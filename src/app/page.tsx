import Container from '@/src/components/Container'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Zorly | Main',
  }
}

export default function Home() {
  return (
    <Container>
      <h1>Zorly</h1>
    </Container>
  )
}
