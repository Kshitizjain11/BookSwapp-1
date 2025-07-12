"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import type { Order } from "@/lib/types"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderId) {
      const existingOrders: Order[] = JSON.parse(localStorage.getItem("mockOrders") || "[]")
      const foundOrder = existingOrders.find((o) => o.id === orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [orderId])

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">The order you are looking for could not be found.</p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase.</p>
      {orderId && (
        <p className="text-md text-muted-foreground mb-6">
          Your Order ID: <span className="font-semibold text-primary">{orderId}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/my-orders">View My Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/marketplace">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
