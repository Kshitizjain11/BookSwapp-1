import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { Footer } from "@/components/footer"
import { FooterConditional } from "@/components/FooterConditional"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookHub - Your Local Book Marketplace",
  description: "Discover, buy, sell, and rent books in your community.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  // Hide footer on chat pages
  const showFooter = !pathname.startsWith("/chat");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main>{children}</main>
            <FooterConditional />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
