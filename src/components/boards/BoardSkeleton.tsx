import { Skeleton } from '@/src/components/ui/skeleton'

export default function BoardSkeleton() {
  return (
    <div className="bg-secondary w-full cursor-default rounded-xl border p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-full rounded-sm" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="h-6 w-full rounded-sm" />
        </div>
        <div className="flex min-h-6 items-center gap-x-1">
          <Skeleton className="h-4 w-full rounded-sm" />
        </div>
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-6 w-full rounded-sm" />
        </div>
      </div>
    </div>
  )
}
