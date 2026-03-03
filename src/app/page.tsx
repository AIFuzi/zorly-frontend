import MainPageLink from '@/src/components/MainPageLink'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Zorly | Main',
  }
}

export default function Home() {
  return <MainPageLink />
}
