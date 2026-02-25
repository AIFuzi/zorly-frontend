import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Plus, Search } from 'lucide-react'

interface WordsParamsProps {}

export default function WordsParams({}: WordsParamsProps) {
  return (
    <div className="flex items-center gap-x-4">
      <Button>
        <Plus /> add words
      </Button>
      <div className="relative">
        <Input
          autoComplete="off"
          placeholder="Search words..."
        />
        <Search
          className="text-muted-foreground absolute top-0 right-0 -translate-x-2 translate-y-1.5"
          size={22}
        />
      </div>
    </div>
  )
}
