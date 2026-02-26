'use client'

import Container from '@/src/components/Container'
import { Button } from '@/src/components/ui/button'
import { GraduationCap, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TrainingHeader() {
  const router = useRouter()

  return (
    <Container className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div className="bg-primary rounded-lg p-2">
          <GraduationCap size={28} />
        </div>
        <h1 className="text-2xl font-semibold">Zorly</h1>
      </div>
      <Button
        variant="outline"
        onClick={() => router.push('/boards')}
      >
        <LogOut />
        <span>Exit training</span>
      </Button>
    </Container>
  )
}
