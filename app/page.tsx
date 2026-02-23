import { Button } from '@/src/components/ui/button'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Zorly | Main',
  }
}

export default function Home() {
  return (
    <div>
      <Button>Hello</Button>
    </div>
  )
}
