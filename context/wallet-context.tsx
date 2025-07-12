"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { toast } from "@/components/ui/use-toast"

interface WalletContextType {
  balance: number
  deposit: (amount: number) => void
  withdraw: (amount: number) => boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(0)

  // Load balance from localStorage on mount
  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance")
    if (storedBalance) {
      setBalance(Number.parseFloat(storedBalance))
    } else {
      setBalance(100.0) // Initial mock balance
      localStorage.setItem("walletBalance", "100.00")
    }
  }, [])

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("walletBalance", balance.toFixed(2))
  }, [balance])

  const deposit = useCallback((amount: number) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount
      toast({
        title: "Deposit Successful!",
        description: `Successfully added $${amount.toFixed(2)} to your wallet. New balance: $${newBalance.toFixed(2)}.`,
        variant: "success",
      })
      return newBalance
    })
  }, [])

  const withdraw = useCallback(
    (amount: number) => {
      if (balance >= amount) {
        setBalance((prevBalance) => prevBalance - amount)
        toast({
          title: "Payment Successful!",
          description: `Successfully paid $${amount.toFixed(2)} from your wallet.`,
          variant: "success",
        })
        return true
      } else {
        toast({
          title: "Insufficient Funds",
          description: `Your wallet balance ($${balance.toFixed(2)}) is too low for this transaction ($${amount.toFixed(2)}).`,
          variant: "destructive",
        })
        return false
      }
    },
    [balance],
  )

  const value = useMemo(() => ({ balance, deposit, withdraw }), [balance, deposit, withdraw])

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
