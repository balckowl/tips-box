import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/layouts/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tips Box",
    template: "%s | Tips Box",
  },
  description:
    "毎朝手軽に自分が使っている技術のtipsを得られるサービス、毎朝にあなたが使っている技術に関する役立つヒントを手軽に受け取れるサービスです。 最新のテクノロジートレンドや効率的なコーディングテクニックを提供し、あなたのスキルアップをサポートします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
