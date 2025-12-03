import { MessageType } from "./MessageType"

export interface ConsoleCharacter {
    text: string
    color?: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    messageType?: MessageType
}
