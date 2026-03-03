'use client'

import Container from '@/src/components/Container'
import { Button } from '@/src/components/ui/button'
import { useRouter } from 'next/navigation'

export default function MainPageLink() {
  const router = useRouter()

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-medium">Zorly language training platform</h1>
      <Button
        variant="link"
        onClick={() => router.push('/boards')}
      >
        Go to boards
      </Button>
    </Container>
  )
}
