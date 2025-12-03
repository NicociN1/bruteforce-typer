import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const dotGothic = DotGothic16({
  weight: '400'
})

export const metadata: Metadata = {
  title: "BruteForce-Typer | タイピングゲーム",
  description: "パスワードのハッキングをテーマにしたタイピングゲーム。アシスタントのAIと一緒に悪事を働いているハッカーのシステムを乗っ取ろう！",
  verification: {
    google: 'J8TVVkURfTF1YRhn5Z76YgxjTOI22UB83ziG3ZT3jW8'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${dotGothic.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
