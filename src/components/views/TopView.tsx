import { Button } from "../ui/button"

interface TopViewProps {
  onClickStart: () => void
}

export function TopView(props: TopViewProps) {
  return (
    <div
      className="flex flex-col items-center"
    >
      <h1
        className="font-bold text-6xl text-center mb-16"
      >
        BruteForce Typing
      </h1>

      <div
        className="space-y-2 w-full"
      >
        <Button
          className="text-2xl"
          size="lg"
        >
          PLAY
        </Button>
      </div>
    </div>
  )
}
