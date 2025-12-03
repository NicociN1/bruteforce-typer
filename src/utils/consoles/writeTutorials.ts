import { ConsoleControls } from "@/types/ConsoleControls";
import { getPasswords } from "../api/passwords";
import { writePreparation } from "./writePreparation";
import { getHacker } from "../api/hackers";
import { HACKER_TYPES } from "./writeGame";

export const writeTutorials = async (con: ConsoleControls) => {
    con.resetCharacters()
    await con.typeToConsole({
        text: 'Hello, 私はBruto.\nあなたのサポートをするアシスタント型AIです.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 2)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信して次へ...\n',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    await con.typeToConsole({
        text: '私はパスワードクラッキングに特化して開発されたAIです.\n悪事を働いているハッカーデータベースからターゲットを検索し, \nそのシステムに侵入するためのパスワードを解析することができます.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 3)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信して次へ...\n',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    await con.typeToConsole({
        text: 'あなたの仕事は, ターゲットのシステムに侵入することです.\nブルートフォース攻撃, つまりパスワードを総当たりしてシステムを乗っ取りましょう.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 3)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信して次へ...\n',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    await con.typeToConsole({
        text: '私にはパスワードをいくつかの候補に絞り込む機能しか搭載されていません.\nその後はあなたの仕事です.\n持ち前のタイピング速度を活かして, パスワードを候補の中から総当たりしてみましょう.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 3)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信して次へ...\n',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    await con.typeToConsole({
        text: 'ターゲット検索中...',
        color: 'skyblue',
        messageType: 'bruto'
    }, 2)

    con.setIsPromptDisabled(true)
    const hacker = await getHacker()
    con.setIsPromptDisabled(false)

    await con.typeToConsole({
        text: 'ターゲット発見\n\nターゲットが見つかりました.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 1)

    await con.typeToConsole({
        text: `\n名前: ${hacker.name}\n個人/組織: ${HACKER_TYPES[hacker.type]}\n働いた悪事:\n${hacker.crime}\n`,
        color: 'white',
    }, 3)

    await con.promptSleep(500)

    await con.typeToConsole({
        text: '腕試しとして, ターゲットのシステムを乗っ取ってしまいましょう.',
        color: 'skyblue',
        messageType: 'bruto'
    }, 1)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信して腕試しを開始...',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    con.resetCharacters()
    await con.typeToConsole({
        text: 'パスワードを解析中...',
        color: 'skyblue',
        messageType: 'bruto'
    }, 0.5)

    con.setIsPromptDisabled(true)
    const passwords = await getPasswords({
        take: 3
    })

    await con.promptSleep(1000)

    con.writeToConsole({
        text: '解析が完了しました.\n候補に上がったパスワードは以下です.\n',
        color: 'skyblue',
        messageType: 'bruto'
    })

    con.writeToConsole({
        text: '[Hint] 検出されたパスワードを入力して送信してみましょう\n'
    })

    const chances = [10, 20, 70]

    con.writeToConsole({
        text: passwords.map((p, i) => `${chances[i]}% => ` + p).join('\n'),
        color: 'white'
    })

    con.promptModeRef.current = 'password'

    let isLoginSucceed = false

    while (!isLoginSucceed) {
        const res = await con.waitCommand({}, ...passwords)

        if (res === 0 || res === 1) {
            con.writeToConsole({
                text: 'パスワードが間違っています',
                color: 'red',
                messageType: 'system'
            })
            con.writeToConsole({
                text: '[Hint] 違うパスワードを入力してみましょう'
            })
        } else {
            isLoginSucceed = true

        }
    }

    con.writeToConsole({
        text: 'ログインに成功しました\n',
        messageType: 'system'
    })

    await con.promptSleep(1000)

    con.writeToConsole({
        text: '任意のキーを送信して次へ...\n',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    con.promptModeRef.current = 'command'

    await con.typeToConsole({
        text: 'チュートリアルは以上です。\n'
    }, 0.5)

    await con.typeToConsole({
        text: 'Happy Hacking!'
    }, 1.5)

    await con.promptSleep(500)

    con.writeToConsole({
        text: '任意のキーを送信してチュートリアルを終了...',
        color: 'white'
    })

    await con.waitCommand({}, undefined)

    writePreparation(con)
}
