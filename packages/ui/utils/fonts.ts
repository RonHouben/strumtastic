import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"

export const sans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const mono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})