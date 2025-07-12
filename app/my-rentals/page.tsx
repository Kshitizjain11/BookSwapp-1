"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookText, Calendar, DollarSign, User, Clock } from "lucide-react"
import Link from "next/link"
import type { Rental } from "@/lib/types"
import { mockRentals } from "@/lib/mock-data"

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])

  useEffect(() => {
    // In a real app, this would fetch from a backend.
    // For now, we'll use localStorage or mock data.
    const storedRentals = localStorage.getItem("mockRentals")
    if (storedRentals) {
      setRentals(JSON.parse(storedRentals))
    } else {
      setRentals(mockRentals) // Fallback to initial mock data
      localStorage.setItem("mockRentals", JSON.stringify(mockRentals))
    }
  }, [])

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600"
      case "Overdue":
        return "text-red-600"
      case "Returned":
        return "text-muted-foreground"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Rentals</h1>
          <p className="text-muted-foreground">Keep track of your rented books and their due dates.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {rentals.length === 0 ? (
          <div className="text-center py-12">
            <BookText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No rentals yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't rented any books. Explore books available for rent!
            </p>
            <Button asChild>
              <Link href="/marketplace">Browse Rentals</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {rentals.map((rental) => (
              <Card key={rental.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl">{rental.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{rental.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(rental.rentalPrice)}/week</p>
                    <p className={`text-sm font-semibold ${getStatusColor(rental.status)}`}>Status: {rental.status}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Separator className="mb-4" />
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={rental.image || "/placeholder.svg"}
                      alt={rental.title}
                      className="w-20 h-28 object-cover rounded-md"
                    />
                    <div className="grid gap-1 text-sm">
                      <p className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Start Date: {formatDate(rental.startDate)}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Due Date: {formatDate(rental.dueDate)}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Duration: {rental.rentalDuration} weeks</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Seller: {rental.seller}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    {rental.status === "Active" && (
                      <Button variant="outline" size="sm">
                        Extend Rental
                      </Button>
                    )}
                    <Button size="sm" asChild>
                      <Link href={`/book/${rental.bookId}`}>View Book</Link>
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
