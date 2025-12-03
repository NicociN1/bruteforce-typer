import { ConsoleControls } from "@/types/ConsoleControls";
import { writePreparation } from "./writePreparation";
import { writeFirst } from "./writeFirst";

export const writeSelectDifficulty = async (con: ConsoleControls) => {
    con.resetCharacters()

    con.writeToConsole({
      text: 'レベルを選択\n'
    })

    await con.typeToConsole({
        text: 'レベルが高くなるにつれ、以下の要素が変動します\n\n* 正しいパスワードの強度が高い傾向が高くなる\n* Brutoの提示するパスワードの数が増える\n* ターゲットのシステム規模が大きくなる\n',
        color: 'gray'
    }, 2)

    await con.promptSleep(500)

    con.writeToConsole({
        text: 'キーを送信してください...\n',
        color: 'white'
    })

    con.writeToConsole({
        text: 'EASY: 1',
        color: 'green'
    })

    con.writeToConsole({
        text: 'NORMAL: 2',
        color: 'skyblue'
    })

    con.writeToConsole({
        text: 'HARD: 3',
        color: 'yellow'
    })

    con.writeToConsole({
        text: '戻る: 0'
    })

    const res = await con.waitCommand({},'0', '1', '2', '3')

    switch (res) {
        case 0:
            writeFirst(con)
        return

        case 1:
            con.difficultyRef.current = 'easy'
        break

        case 2:
            con.difficultyRef.current = 'normal'
        break

        case 3:
            con.difficultyRef.current = 'hard'
        break
    }

    writePreparation(con)
}
