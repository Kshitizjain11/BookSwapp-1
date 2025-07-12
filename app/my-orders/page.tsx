"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/lib/types"
import { mockOrders } from "@/lib/mock-data"

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // In a real app, this would fetch from a backend.
    // For now, we'll use localStorage or mock data.
    const storedOrders = localStorage.getItem("mockOrders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      setOrders(mockOrders) // Fallback to initial mock data
      localStorage.setItem("mockOrders", JSON.stringify(mockOrders))
    }
  }, [])

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your purchases and view order history.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders. Start exploring the marketplace!
            </p>
            <Button asChild>
              <Link href="/marketplace">Browse Books</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl">Order ID: {order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(order.totalAmount)}</p>
                    <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-muted-foreground text-sm">{item.author}</p>
                          <p className="text-sm">
                            {item.quantity} x{" "}
                            {item.type === "buy"
                              ? formatPrice(item.price)
                              : `${formatPrice(item.price)}/week (${item.rentalDuration} weeks)`}
                          </p>
                        </div>
                        <span className="font-semibold">
                          {formatPrice(
                            item.type === "buy"
                              ? item.price * item.quantity
                              : item.price * item.rentalDuration! * item.quantity,
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Payment Method:</p>
                      <p className="text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                    {order.deliveryAddress && (
                      <div>
                        <p className="font-medium">Delivery Address:</p>
                        <p className="text-muted-foreground">{order.deliveryAddress}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="outline" size="sm">
                      View Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
