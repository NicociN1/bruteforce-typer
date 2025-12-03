import { HackerType } from "./HackerType"

export interface HackerDatabase {
    type: HackerType
    name: string
    crime: string
    systemScale: 1 | 2 | 3
}
