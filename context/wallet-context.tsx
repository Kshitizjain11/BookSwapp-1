"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"

interface WalletContextType {
  balance: number
  deposit: (amount: number) => void
  withdraw: (amount: number) => boolean // Returns true if successful, false otherwise
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(0)

  // Load balance from localStorage on initial load
  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance")
    if (storedBalance) {
      setBalance(Number.parseFloat(storedBalance))
    }
  }, [])

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("walletBalance", balance.toFixed(2))
  }, [balance])

  const deposit = useCallback((amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Deposit Error",
        description: "Deposit amount must be positive.",
        variant: "destructive",
      })
      return
    }
    setBalance((prevBalance) => prevBalance + amount)
    toast({
      title: "Deposit Successful",
      description: `Successfully added $${amount.toFixed(2)} to your wallet.`,
    })
  }, [])

  const withdraw = useCallback(
    (amount: number) => {
      if (amount <= 0) {
        toast({
          title: "Withdrawal Error",
          description: "Withdrawal amount must be positive.",
          variant: "destructive",
        })
        return false
      }
      if (balance >= amount) {
        setBalance((prevBalance) => prevBalance - amount)
        toast({
          title: "Withdrawal Successful",
          description: `Successfully paid $${amount.toFixed(2)} from your wallet.`,
        })
        return true
      } else {
        toast({
          title: "Insufficient Funds",
          description: "You do not have enough balance in your wallet.",
          variant: "destructive",
        })
        return false
      }
    },
    [balance],
  )

  const value = React.useMemo(
    () => ({
      balance,
      deposit,
      withdraw,
    }),
    [balance, deposit, withdraw],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
