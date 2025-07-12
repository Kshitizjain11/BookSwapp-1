"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Package, BookText, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "order",
      icon: <Package className="w-5 h-5 text-green-500" />,
      title: "Order Confirmed!",
      description: "Your order #ORD-12345 has been successfully placed.",
      date: "2024-07-10T10:00:00Z",
      link: "/my-orders",
      read: false,
    },
    {
      id: "2",
      type: "rental",
      icon: <BookText className="w-5 h-5 text-amber-500" />,
      title: "Rental Confirmed!",
      description: "You have successfully rented 'The Hobbit'. Due in 7 days.",
      date: "2024-07-09T14:30:00Z",
      link: "/my-rentals",
      read: false,
    },
    {
      id: "3",
      type: "message",
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      title: "New Message from Seller",
      description: "John Doe replied to your inquiry about '1984'.",
      date: "2024-07-09T11:15:00Z",
      link: "/messages/john-doe",
      read: true,
    },
    {
      id: "4",
      type: "wishlist",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Price Drop Alert!",
      description: "'Pride and Prejudice' on your wishlist just dropped to $7.99!",
      date: "2024-07-08T09:00:00Z",
      link: "/wishlist",
      read: false,
    },
    {
      id: "5",
      type: "seller",
      icon: <Package className="w-5 h-5 text-purple-500" />,
      title: "Your Book Sold!",
      description: "'The Great Gatsby' has been purchased. Prepare for shipment.",
      date: "2024-07-07T16:00:00Z",
      link: "/seller-dashboard/sales",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadNotificationsCount = notifications.filter((notif) => !notif.read).length
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your orders, rentals, and messages.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No new notifications</h3>
            <p className="text-muted-foreground mb-6">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Notifications ({unreadNotificationsCount} unread)</h2>
              <Button
                variant="outline"
                onClick={() => setNotifications(notifications.map((notif) => ({ ...notif, read: true })))}
                disabled={unreadNotificationsCount === 0}
                className="border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
              >
                Mark All as Read
              </Button>
            </div>
            {notifications.map((notif) => (
              <Card key={notif.id} className={!notif.read ? "bg-card-foreground/5 border-primary/20" : ""}>
                <CardContent className="p-4 flex items-start space-x-4">
                  <div className="pt-1">{notif.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${!notif.read ? "text-primary" : ""}`}>{notif.title}</h3>
                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDateTime(notif.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notif.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notif.id)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        Mark as Read
                      </Button>
                    )}
                    {notif.link && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-muted-foreground/20 hover:border-muted-foreground/40 bg-transparent"
                      >
                        <Link href={notif.link}>View</Link>
                      </Button>
                    )}
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
