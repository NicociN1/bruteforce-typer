import { hackerDatabase } from "@/data/hackerDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({
        hacker: hackerDatabase[Math.floor(Math.random() * hackerDatabase.length)]
    })
}
