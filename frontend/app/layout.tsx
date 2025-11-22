import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "DESIGNAL - Déco & Design d'Intérieur",
  description: "L'art de sublimer les espaces. Studio créatif de design et de décoration d'intérieur.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${poppins.variable} antialiased`} style={{fontFamily: 'var(--font-inter)'}}>
        {children}
      </body>
    </html>
  )
}