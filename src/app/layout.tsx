import './globals.css'
import { VT323, Inter } from 'next/font/google'
import cx from "classnames";

const inter = Inter({ variable: "--font-inter", subsets: ['latin'] })
const vt323 = VT323({ variable: "--font-vt323", subsets: ['latin'], weight: '400', })

const title = 'MUD-AI-Docs'
const description = 'Use AI to interpret MUD documents'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@aliezsss4",
  },
  metadataBase: new URL("https://mud-ai-docs.vercel.app"),
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(vt323.variable, inter.variable)}>{children}</body>
    </html>
  )
}
