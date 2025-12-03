import { ConsoleControls } from "@/types/ConsoleControls";
import { Difficulty } from "@/types/Difficulty";
import { getPasswords } from "../api/passwords";
import { weightedChooser } from "../weightedChooser";
import { checkPasswordStrength } from "../checkPasswordStrength";
import { writeSelectDifficulty } from "./writeSelectDifficulty";
import { getHacker } from "../api/hackers";
import { HackerType } from "@/types/HackerType";

const PASSWORD_COUNTS: Record<Difficulty, number> = {
    'easy': 3,
    'normal': 4,
    'hard': 5
}
const WEIGHTS: Record<Difficulty, number[]> = {
    easy: [10, 5, 2, 1],
    normal: [5, 3, 2, 1],
    hard: [1, 2, 5, 10]
}
export const HACKER_TYPES: Record<HackerType, string> = {
    individual: '個人',
    organization: '組織',
    unknown: '不明'
}
const SYSTEM_SCALE_MULTIPLIER: Record<Difficulty, number> = {
    easy: 1,
    normal: 2,
    hard: 3
}
const DIFFICULTY_SCORE_MULTIPLIER: Record<Difficulty, number> = {
    easy: 1,
    normal: 1.3,
    hard: 1.5
}

export const writeGame = async (con: ConsoleControls) => {
    con.resetCharacters()

    await con.typeToConsole({
        text: 'ターゲットを検索中...',
        color: 'skyblue',
        messageType: 'bruto'
    }, 1)

    con.setIsPromptDisabled(true)
    const hacker = await getHacker()
    con.setIsPromptDisabled(false)

    const systemScale = hacker.systemScale * SYSTEM_SCALE_MULTIPLIER[con.difficultyRef.current]

    con.writeToConsole({
        text: 'ターゲットを発見\n',
        color: 'skyblue',
        messageType: 'bruto'
    })

    await con.promptSleep(1000)

    con.writeToConsole({
        text: 'データベースを読み込み中...',
        color: 'skyblue',
        messageType: 'bruto'
    })

    await con.promptSleep(1000)

    con.writeToConsole({
        text: 'ターゲットの詳細は以下です.',
        color: 'skyblue',
        messageType: 'bruto'
    })
    await con.typeToConsole({
        text: `\n名前: ${hacker.name}\n個人/組織: ${HACKER_TYPES[hacker.type]}\n働いた悪事:\n${hacker.crime}`,
        color: 'white',
    }, 3)

    await con.typeToConsole({
        text: `システム規模: ${systemScale}\n`,
        color: 'red'
    }, 1)

    await con.promptSleep(500)

    let totalElapsedTime = 0
    let totalTypeErrorCount = 0
    let elapsedTimes: number[] = []

    for (let breakingLevel = 1; breakingLevel <= systemScale; breakingLevel++) {
        con.writeToConsole({
            text: `システム侵入度: [${breakingLevel}/${systemScale}]\n`,
            color: 'skyblue',
            messageType: 'bruto'
        }) 

        con.writeToConsole({
            text: '任意のキーを送信して開始...',
            color: 'white'
        })

        await con.waitCommand({}, undefined)

        await con.typeToConsole({
            text: 'パスワードを解析中...',
            color: 'skyblue',
            messageType: 'bruto'
        }, 1)

        con.setIsPromptDisabled(true)

        const passwords = await getPasswords({
            take: PASSWORD_COUNTS[con.difficultyRef.current]
        })

        con.setIsPromptDisabled(false)

        await con.promptSleep(500)

        con.promptModeRef.current = 'password'

        con.writeToConsole({
            text: '解析が完了しました.\n候補に上がったパスワードは以下です.\n',
            color: 'skyblue',
            messageType: 'bruto'
        })

        let elapsedTime = 0
        let typeErrorCount = 0
        const interval = setInterval(() => {
            elapsedTime += 100
            totalElapsedTime += 100
        }, 100)

        const strengths = passwords.map(p => {
            const weights = WEIGHTS[con.difficultyRef.current]
            const strength = checkPasswordStrength(p)
            const weight = weights[strength - 1]
            console.log('passwords: ', weights, strength, weight)
            return weight
        })
        const total = strengths.reduce((a, b) => a + b)

        con.writeToConsole({
            text: passwords.map((p, i) => `${Math.floor(strengths[i] / total * 100)}% => ${p}`).join('\n'),
            color: 'white'
        })

        const choosedIndex = weightedChooser(strengths)

        let isSucceedLogin = false

        while (!isSucceedLogin) {
            const res = await con.waitCommand({
                onError: () => {
                    typeErrorCount++
                    totalTypeErrorCount++
                }
            }, ...passwords)

            if (choosedIndex !== res) {
                con.writeToConsole({
                    text: 'パスワードが間違っています',
                    color: 'red',
                    messageType: 'system'
                })
            } else {
                isSucceedLogin = true
            }
        }

        clearInterval(interval)

        elapsedTimes.push(elapsedTime)

        con.writeToConsole({
            text: 'ログインに成功しました\n',
            messageType: 'system'
        })

        await con.promptSleep(1000)

        await con.typeToConsole({
            text: 'システムの侵入に成功しました.\n以下に作業データを示します.\n',
            color: 'skyblue',
            messageType: 'bruto'
        }, 1)

        await con.typeToConsole({
            text: `作業時間: ${elapsedTime / 1000}秒\nタイプミスで送信した回数: ${typeErrorCount}回\n`,
            color: 'yellow'
        }, 1)

        if (breakingLevel === systemScale) {
            await con.promptSleep(500)

            await con.typeToConsole({
                text: 'システムの乗っ取りに成功しました.\n以下に今回の総合データを示します.',
                color: 'skyblue',
                messageType: 'bruto'
            }, 1.5)

            const averageElapsedTime = Math.floor(elapsedTimes.reduce((a, b) => a + b) / elapsedTimes.length * 10) / 10 / 1000

            await con.typeToConsole({
                text: `合計作業時間: ${totalElapsedTime / 1000}秒\n合計タイプミス送信回数: ${totalTypeErrorCount}回\n平均作業時間: ${averageElapsedTime}秒`,
                color: 'yellow'
            }, 2)

            const score = Math.floor(1 / (averageElapsedTime / 1000 + totalTypeErrorCount * 5) * DIFFICULTY_SCORE_MULTIPLIER[con.difficultyRef.current])

            await con.typeToConsole({
                text: 'ゲームクリア！'
            }, 1)

            await con.promptSleep(500)

            await con.typeToConsole({
                text: `総合スコア: ${score}`,
                color: 'yellow'
            }, 2)
        }
    }

    con.writeToConsole({
        text: '任意のキーを送信して終了',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    writeSelectDifficulty(con)
}
