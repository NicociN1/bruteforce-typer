import { Difficulty } from "@/types/Difficulty";
import { create } from "zustand";

interface GameDataState {
    difficulty: Difficulty
    setDifficulty: (difficulty: Difficulty) => void
    elapsedTime: number
    setElapsedTime: (elapsedTime: number) => void
}

export const useGameData = create<GameDataState>()((set) => ({
    difficulty: 'easy',
    setDifficulty: (difficulty) => set(() => ({ difficulty })),
    elapsedTime: 0,
    setElapsedTime: (elapsedTime) => set(() => ({ elapsedTime })),
}))
