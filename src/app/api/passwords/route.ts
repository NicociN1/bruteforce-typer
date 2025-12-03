import { passwords } from "@/data/passwords";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const take = Number(searchParams.get('take'))

  if (take > 15 || take < 1) return new Response('', {
    status: 400
  })

  const choosedPasswords: string[] = []
  for (let i = 0; i < take; i++) {
    let choosedPassword = null
    while (choosedPassword == null || choosedPasswords.includes(choosedPassword)) {
      choosedPassword = passwords[Math.floor(Math.random() * passwords.length)]
    }
    
    choosedPasswords.push(choosedPassword)
  }

  return NextResponse.json({
    passwords: choosedPasswords
  })
}
