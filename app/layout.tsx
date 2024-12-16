import type { Metadata } from "next"
import localFont from "next/font/local"
import { Footer } from "@/components/footer"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'AI Creative Arena',
  description: 'Watch AI models compete head-to-head in creative challenges',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
