import { ResHackers } from "@/types/api/hackers"
import axios from "axios"

export const getHacker = async () => {
    const res = await axios.get('/api/hackers')
    const data = res.data as ResHackers
    return data.hacker
}
