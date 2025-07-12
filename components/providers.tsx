"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { WalletProvider } from "@/context/wallet-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <WalletProvider>
          {children}
          <Toaster />
        </WalletProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
