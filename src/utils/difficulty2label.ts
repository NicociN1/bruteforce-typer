import { Difficulty } from "@/types/Difficulty";

export const difficulty2label = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'EASY'
    
    case 'normal':
      return 'NORMAL'

    case 'hard':
      return 'HARD'
  }
}
