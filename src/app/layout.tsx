import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: '400'
})

export const metadata: Metadata = {
  title: "タイピングゲーム | BruteForce-Typer",
  description: "パスワードのハッキングをテーマにしたタイピングゲーム。アシスタントのAIと一緒に悪事を働いているハッカーのシステムを乗っ取ろう！",
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
      </body>
    </html>
  );
}
