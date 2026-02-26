import TrainingHeader from '@/src/components/header/TrainingHeader'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <TrainingHeader />
      {children}
    </div>
  )
}
