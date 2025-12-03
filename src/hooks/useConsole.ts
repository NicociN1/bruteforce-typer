import { ConsoleCharacter } from "@/types/ConsoleCharacter"
import { MessageType } from "@/types/MessageType"
import { sleep } from "@/utils/sleep"
import { useState } from "react"

const MESSAGE_TYPES: Record<MessageType, string | undefined> = {
    hint: 'Hint',
    bruto: 'Bruto',
    system: 'System',
    none: undefined
}

    export const useConsole = () => {
    const [characters, setCharacters] = useState<ConsoleCharacter[]>([])
    const [isCharacterDrawing, setIsCharacterDrawing] = useState(false)

    const writeToConsole = (character: ConsoleCharacter) => {
        const prefixInner = MESSAGE_TYPES[character.messageType ?? 'none']
        const prefix = prefixInner != undefined ? `[${prefixInner}] ` : ''
        setCharacters(characters => [...characters, { ...character, text: prefix + character.text }])
    }
    const typeToConsole = async (character: ConsoleCharacter, time: number) => {
        setIsCharacterDrawing(true)

        const prefixInner = MESSAGE_TYPES[character.messageType ?? 'none']
        const prefix = prefixInner != undefined ? `[${prefixInner}] ` : ''

        const text = prefix + character.text

        let newIndex = -1
        setCharacters(prev => {
        newIndex = prev.length
            return [...prev, {...character, text: text.slice(0, 1)}]
        })

        for (let count = 1; count <= text.length; count++) {
            await sleep(time * 1000 / text.length)
            const newText = text.slice(0, count)
            setCharacters(characters => {
                const newCharacters = [...characters]
                newCharacters[newIndex].text = newText
                return newCharacters
            })
        }

        setIsCharacterDrawing(false)
    }
    const resetCharacters = () => setCharacters([])

    return {
        characters,
        writeToConsole,
        typeToConsole,
        resetCharacters,
        isCharacterDrawing
    }
}
