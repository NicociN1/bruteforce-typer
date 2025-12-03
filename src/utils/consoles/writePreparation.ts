import { ConsoleControls } from "@/types/ConsoleControls";
import { difficulty2label } from "../difficulty2label";
import { writeTutorials } from "./writeTutorials";
import { writeGame } from "./writeGame";

export const writePreparation = async (con: ConsoleControls) => {
    con.writeToConsole({
        text: `\n難易度「${difficulty2label(con.difficultyRef.current)}」が選択されました\n`,
        color: 'red'
    })

    con.writeToConsole({
        text: '起動中...\n',
        color: 'skyblue',
        messageType: 'bruto'
    })

    await con.promptSleep(1000)

    if (con.difficultyRef.current === 'easy') {
        con.writeToConsole({
            text: 'チュートリアルを実施しますか？\n\nキーを送信してください...\n\nスキップ: 1 | チュートリアル: 2',
            color: 'white'
        })

        const res = await con.waitCommand({},
            '1',
            '2'
        )

        if (res === 0) {
            writeGame(con)
        } else {
            writeTutorials(con)
        }
    } else {
        con.writeToConsole({
            text: 'Enterでゲーム開始...',
            color: 'white'
        })

        await con.waitCommand({}, undefined)

        writeGame(con)
    }
}
