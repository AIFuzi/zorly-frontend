import { cn } from '@/src/shared/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-primary animate-pulse', className)}
      {...props}
    />
  )
}

export { Skeleton }
