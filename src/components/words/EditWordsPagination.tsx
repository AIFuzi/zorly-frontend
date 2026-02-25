import { Button } from '@/src/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface EditWordsPaginationProps {}

export default function EditWordsPagination({}: EditWordsPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-muted-foreground font-medium">
          Showing <span className="text-foreground font-semibold">1 - 10 </span>
          of 1.000 words
        </h1>
      </div>
      <div className="flex items-center gap-x-4">
        <Button>
          <ChevronLeft />
        </Button>
        1 / 10
        <Button>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
