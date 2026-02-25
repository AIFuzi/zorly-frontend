import { cn } from '@/src/shared/lib/utils'
import { PropsWithChildren } from 'react'

interface ContainerProps {
  className?: string
}

export default function Container({
  children,
  className,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div className={cn('mr-auto mb-20 ml-auto w-[80%]', className)}>
      {children}
    </div>
  )
}
