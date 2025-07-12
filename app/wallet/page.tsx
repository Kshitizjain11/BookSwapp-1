"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Wallet, PlusCircle } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import { toast } from "@/components/ui/use-toast"

export default function WalletPage() {
  const { balance, deposit } = useWallet()
  const [depositAmount, setDepositAmount] = useState("")

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive number for deposit.",
        variant: "destructive",
      })
      return
    }
    deposit(amount)
    setDepositAmount("")
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wallet</h1>
          <p className="text-muted-foreground">Manage your in-app balance for seamless transactions.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-green-600">{formatPrice(balance)}</div>
            <p className="text-muted-foreground mt-2">Your available funds for purchases and rentals.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-6 w-6" />
              Recharge Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="deposit-amount">Amount to Deposit</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="e.g., 25.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </div>
            <Button onClick={handleDeposit} className="w-full bg-amber-600 hover:bg-amber-700">
              <DollarSign className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setDepositAmount("10.00")}>
                + $10
              </Button>
              <Button variant="outline" onClick={() => setDepositAmount("25.00")}>
                + $25
              </Button>
              <Button variant="outline" onClick={() => setDepositAmount("50.00")}>
                + $50
              </Button>
              <Button variant="outline" onClick={() => setDepositAmount("100.00")}>
                + $100
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
