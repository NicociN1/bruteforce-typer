import { ReqPasswords, ResPasswords } from "@/types/api/passwords";
import axios from "axios";

export const getPasswords = async (query: ReqPasswords) => {
  const res = await axios.get(`/api/passwords?take=${query.take}`)
  const data = res.data as ResPasswords
  return data.passwords
}
