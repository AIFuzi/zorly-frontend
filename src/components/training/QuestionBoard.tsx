import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { CornerDownLeft, Lightbulb, SkipForward } from 'lucide-react'

interface QuestionBoardProps {}

export default function QuestionBoard({}: QuestionBoardProps) {
  return (
    <div className="bg-card w-full rounded-lg border">
      <div className="flex flex-col items-center justify-center space-y-12 pt-6 pb-6">
        <div className="bg-primary/20 rounded-full">
          <h1 className="text-primary pr-12 pl-12 text-xl">BOARD TITLE</h1>
        </div>
        <h1 className="text-7xl font-semibold">김치</h1>
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative">
            <Input
              placeholder="Type the answer here..."
              autoComplete="off"
              className="border-primary/20 h-24 text-xl lg:w-96"
            />
            <CornerDownLeft className="text-primary absolute top-0 right-0 -translate-x-4 translate-y-9" />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="bg-primary/10 rounded-lg border p-2">
              <h4 className="text-muted-foreground">Enter</h4>
            </div>
            <h4 className="text-muted-foreground">to submit answer</h4>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="link"
            className="text-muted-foreground"
          >
            <Lightbulb />
            <span>show hint</span>
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground"
          >
            <SkipForward />
            <span>skip question</span>
          </Button>
        </div>
        <div className="text-muted-foreground flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <h4>3 Correct</h4>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-2 w-2 rounded-full bg-red-600" />
            <h4>1 Incorrect</h4>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-primary h-2 w-2 rounded-full" />
            <h4>0 Skip</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
