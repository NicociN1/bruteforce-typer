import { ConsoleControls } from "@/types/ConsoleControls"
import { writeSelectDifficulty } from "./writeSelectDifficulty"

export const writeFirst = async (con: ConsoleControls) => {
    con.resetCharacters()

    await con.typeToConsole(
        {
            text: 'Hello, World!\n\nWelcome to BruteForce Typer!\nはじめまして, ようこそ "BruteForce Typer" へ！',
        },
        3
    )
    await con.promptSleep(500)

    con.writeToConsole({
        text: '\n\nキーを送信してください...\n\nPLAY: 1',
        color: 'white'
    })

    const res = await con.waitCommand({}, '1')

    if (res === 0) {
        writeSelectDifficulty(con)
    }
}
