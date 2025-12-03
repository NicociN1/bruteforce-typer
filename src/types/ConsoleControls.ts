import { RefObject } from "react";
import { ConsoleCharacter } from "./ConsoleCharacter";
import { Difficulty } from "./Difficulty";
import { GameResult } from "./GameResult";

export interface CommandOptions {
    stopWhenError?: boolean
    onError?: (command: string, options: string[]) => void
}

export interface ConsoleControls {
    writeToConsole: (character: ConsoleCharacter) => void
    typeToConsole: (character: ConsoleCharacter, time: number) => Promise<void>
    setIsPromptDisabled: (disabled: boolean) => void
    waitCommand: (options: CommandOptions, ...commands: (string | undefined)[]) => Promise<number>
    resetCharacters: () => void
    difficultyRef: RefObject<Difficulty>
    promptModeRef: RefObject<'command' | 'password'>
    gameResultRef: RefObject<GameResult>
    promptSleep: (time: number) => Promise<void>
}
