import { Progress } from '@/src/components/ui/progress'

interface SessionProgressProps {}

export default function SessionProgress({}: SessionProgressProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-muted-foreground text-2xl font-semibold">
          Current session
        </h1>
        <h1 className="text-primary text-2xl font-semibold">5 / 20</h1>
      </div>
      <Progress
        className="text-primary h-3"
        value={100 / 5}
      />
    </div>
  )
}
