import { Difficulty } from "@/types/Difficulty";
import { DifficultyButton } from "../lib/DifficultyButton";

interface DifficultyViewProps {
  onClickDifficulty: (difficulty: Difficulty) => void
  onClickBack: () => void
}

export function DifficultyView(props: DifficultyViewProps) {
  return (
    <div
      className="space-y-4"
    >
      <h1
        className="text-5xl font-bold text-center"
      >
        DIFFICULTY
      </h1>

      <DifficultyButton
        difficulty="easy"
        onClick={() => props.onClickDifficulty('easy')}
      >
        イージー
      </DifficultyButton>

      <DifficultyButton
        difficulty="normal"
        onClick={() => props.onClickDifficulty('normal')}
      >
        ノーマル
      </DifficultyButton>

      <DifficultyButton
        difficulty="hard"
        onClick={() => props.onClickDifficulty('hard')}
      >
        ハード
      </DifficultyButton>

      <button
        onClick={props.onClickBack}
        className="cursor-pointer text-xl bg-black py-1 w-full text-white rounded-md"
      >
        戻る
      </button>
    </div>
  )
}
