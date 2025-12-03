import { ConsoleCharacter } from "@/types/ConsoleCharacter";
import { CommandOptions } from "@/types/ConsoleControls";
import { Difficulty } from "@/types/Difficulty";
import { GameResult } from "@/types/GameResult";
import { writeFirst } from "@/utils/consoles/writeFirst";
import { sleep } from "@/utils/sleep";
import { useEffect, useRef, useState } from "react";


export const useGame = ({
    writeToConsole,
    typeToConsole,
    resetCharacters,
}: {
    writeToConsole: (character: ConsoleCharacter) => void,
    typeToConsole: (character: ConsoleCharacter, time: number) => Promise<void>
    resetCharacters: () => void
}) => {
    const hasRun = useRef(false)
    const [isPromptDisabled, setIsPromptDisabled] = useState(false)
    const promptModeRef = useRef<'command' | 'password'>('command')
    const difficultyRef = useRef<Difficulty>('easy')
    const gameResultRef = useRef<GameResult>({
        miss: 0,
        totalCharacters: 0,
        totalScore: 0
    })
    const onPromptSubmitRef = useRef<(prompt: string) => void>((prompt) => { })

    const promptSleep = async (time: number) => {
        setIsPromptDisabled(true)
        await sleep(time)
        setIsPromptDisabled(false)
    }

    const waitCommand = (options: CommandOptions, ...commands: (string | undefined)[]) => {
        return new Promise<number>((resolve) => {
            onPromptSubmitRef.current = (prompt: string) => {
                const input = prompt.split(' ')
                if (promptModeRef.current === 'command') {
                    const cmdIndex = commands.indexOf(input[0])
                    if (cmdIndex === -1) {
                        if (!commands.includes(undefined) && !options?.stopWhenError) {
                            writeToConsole({
                                text: `コマンド「${input[0]}」が見つかりませんでした`,
                                color: 'red'
                            })
                        } else {
                            onPromptSubmitRef.current = () => { }
                            resolve(cmdIndex)
                        }
                    } else {
                        onPromptSubmitRef.current = () => { }
                        resolve(cmdIndex)
                    }
                } else if (promptModeRef.current === 'password') {
                    const cmdIndex = commands.indexOf(prompt)
                    if (cmdIndex === -1) {
                        if (!commands.includes(undefined) && !options?.stopWhenError) {
                            writeToConsole({
                                text: 'そのパスワードは候補にないようです.',
                                color: 'skyblue',
                                messageType: 'bruto'
                            })

                            gameResultRef.current.miss++
                        } else {
                            onPromptSubmitRef.current = () => { }
                            resolve(cmdIndex)
                        }
                    } else {
                        onPromptSubmitRef.current = () => { }
                        resolve(cmdIndex)
                    }
                }
            }
        })
    }

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        writeFirst({
            typeToConsole,
            writeToConsole,
            setIsPromptDisabled,
            waitCommand,
            resetCharacters,
            difficultyRef,
            promptModeRef,
            gameResultRef,
            promptSleep
        })
    }, [])

    return {
        isPromptDisabled,
        onPromptSubmitRef
    }
}
