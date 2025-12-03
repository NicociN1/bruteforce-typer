import { useGame } from "@/hooks/useGame"
import { Difficulty } from "@/types/Difficulty"
import { PreparationView } from "../gameViews/PreparationView"
import { useEffect, useState } from "react"
import { ResultView } from "../gameViews/ResultView"
import { KEY_COLORS } from "@/utils/keyColors"

interface GameViewProps {
  difficulty: Difficulty
}

const BLOCK_SIZE = 40

export function GameView(props: GameViewProps) {
  const {
    currentTime,
    maxTime,
    startGame,
    gameState,
    gameResult,
    initializeGame,
    keyCount,
    keys,
    boxes,
    breakBoxes,
  } = useGame(props.difficulty)

  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      console.log(gameState)
      if (gameState === 'preparation' && (e.key === ' ' || e.key === 'Enter')) {
        initializeGame()
        startGame()
      } else if (gameState === 'in-game' && keys.includes(e.key)) {
        setPressedKeys(prev => [...prev, e.key])
        breakBoxes(e.key)
      }
    }

    function onKeyup(e: KeyboardEvent) {
      if (gameState === 'in-game') {
        setPressedKeys(prev => prev.filter(k => k !== e.key))
      }
    }

    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)

    return () => {
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)
    }
  }, [keys, gameState])

  return (
    <div
      className="text-white"
    >
      {gameState === 'preparation' && (
        <PreparationView />
      )}
      {gameState === 'result' && (
        <ResultView
          result={gameResult}
        />
      )}
      {gameState === 'in-game' && (
        <main
          className="relative"
          style={{
            width: `${BLOCK_SIZE * keyCount}px`,
            height: `${BLOCK_SIZE * 8}px`
          }}
        >
          {keys.map((k, i) => (
            <div
              className="absolute flex justify-center items-center"
              key={k}
              style={{
                width: `${BLOCK_SIZE}px`,
                height: `${BLOCK_SIZE}px`,
                backgroundColor: (KEY_COLORS as {[key: string]: string})[k],
                bottom: 0,
                left: `${BLOCK_SIZE * i}px`,
                border: pressedKeys.includes(k) ? 'solid 2px white' : boxes.find(b => b.targetKey === k && b.y >= 5) ? 'solid 2px red' : undefined
              }}
            >
              {k.toUpperCase()}
            </div>
          ))}

          {boxes.map(b => (
            <div
              className="absolute flex transition-all duration-100 p-1"
              key={b.id}
              style={{
                width: `${BLOCK_SIZE}px`,
                height: `${BLOCK_SIZE}px`,
                left: `${BLOCK_SIZE * b.x}px`,
                top: `${BLOCK_SIZE * b.y}px`,
              }}
            >
              <div
                className="bg-purple-400 w-full h-full flex justify-center items-center font-bold text-xl"
              >
                {b.order}
              </div>
            </div>
          ))}

          <div
            className="w-full absolute top-0 h-1 bg-white"
          />

          <div
            className="w-full absolute bg-red-400/20"
            style={{
              height: `${BLOCK_SIZE * 2}px`,
              bottom: `${BLOCK_SIZE}px`,
            }}
          />

          <div
            className="absolute -bottom-4 h-4 bg-lime-500 left-1/2 -translate-x-1/2"
            style={{
              width: `${currentTime / maxTime * 100}%`
            }}
          />
        </main>
      )}
    </div>
  )
}
