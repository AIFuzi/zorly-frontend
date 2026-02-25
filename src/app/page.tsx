import Container from '@/src/components/Container'
import { Button } from '@/src/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

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
