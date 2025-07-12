"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Heart,
  ShoppingCart,
  Calendar,
  Star,
  MessageCircle,
  Users,
  BookOpen,
  Check,
  X,
  Settings,
  Package,
  BookText,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "wishlist_discount",
    title: "Price Drop Alert!",
    message: "The Midnight Library is now 20% off - was $18.99, now $15.99",
    bookTitle: "The Midnight Library",
    bookId: 1,
    timestamp: "2024-07-15T10:30:00Z",
    isRead: false,
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    type: "order_confirmation",
    title: "Order Confirmed!",
    message: "Your order #ORD-20240712-001 for 'Atomic Habits' has been placed.",
    orderId: "ORD-20240712-001",
    timestamp: "2024-07-12T14:00:00Z",
    isRead: false,
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    type: "rental_confirmation",
    title: "Rental Confirmed!",
    message: "You've successfully rented 'Dune' for 7 days. Due on 2024-07-19.",
    rentalId: "RENT-20240712-001",
    timestamp: "2024-07-12T14:05:00Z",
    isRead: false,
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 4,
    type: "seller_sale",
    title: "Book Sold!",
    message: "Your book 'The Psychology of Money' has been sold.",
    bookId: 4,
    timestamp: "2024-07-12T14:10:00Z",
    isRead: false,
    icon: DollarSign,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 5,
    type: "wishlist_available",
    title: "Book Now Available!",
    message: "Dune by Frank Herbert is back in stock and ready to purchase",
    bookTitle: "Dune",
    bookId: 3,
    timestamp: "2024-07-14T15:45:00Z",
    isRead: false,
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 6,
    type: "rental_reminder",
    title: "Rental Due Soon",
    message: "Your rental of 'Atomic Habits' is due in 2 days",
    bookTitle: "Atomic Habits",
    bookId: 2,
    timestamp: "2024-07-14T09:00:00Z",
    isRead: true,
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 7,
    type: "review_request",
    title: "Review Request",
    message: "How was your experience with 'The Psychology of Money'? Leave a review!",
    bookTitle: "The Psychology of Money",
    bookId: 4,
    timestamp: "2024-07-13T14:20:00Z",
    isRead: true,
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    id: 8,
    type: "community",
    title: "New Discussion",
    message: "BookLover123 started a discussion about 'Best Fantasy Books of 2024'",
    timestamp: "2024-07-13T11:15:00Z",
    isRead: true,
    icon: MessageCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 9,
    type: "order_update",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and will arrive in 2-3 days",
    timestamp: "2024-07-12T16:30:00Z",
    isRead: true,
    icon: ShoppingCart,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notificationList.filter((notif) => !notif.isRead)
      case "wishlist":
        return notificationList.filter(
          (notif) => notif.type === "wishlist_discount" || notif.type === "wishlist_available",
        )
      case "orders":
        return notificationList.filter(
          (notif) =>
            notif.type === "order_update" || notif.type === "order_confirmation" || notif.type === "seller_sale",
        )
      case "rentals":
        return notificationList.filter(
          (notif) => notif.type === "rental_reminder" || notif.type === "rental_confirmation",
        )
      case "community":
        return notificationList.filter((notif) => notif.type === "community" || notif.type === "review_request")
      default:
        return notificationList
    }
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notificationList.filter((notif) => !notif.isRead).length

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your books and community</p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && <Badge className="bg-red-500">{unreadCount} unread</Badge>}
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-xs bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              Unread
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <BookText className="w-4 h-4" />
              Rentals
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <Card
                      key={notification.id}
                      className={`transition-all hover:shadow-md ${
                        !notification.isRead ? "border-l-4 border-l-amber-500 bg-amber-50/30" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${notification.bgColor}`}>
                            <IconComponent className={`w-5 h-5 ${notification.color}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">
                                  {notification.title}
                                  {!notification.isRead && (
                                    <Badge className="ml-2 h-2 w-2 rounded-full p-0 bg-amber-500" />
                                  )}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatTimestamp(notification.timestamp)}
                                </p>
                              </div>

                              <div className="flex items-center gap-1 ml-4">
                                {!notification.isRead && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Action buttons for specific notification types */}
                            {(notification.type === "wishlist_discount" ||
                              notification.type === "wishlist_available") &&
                              notification.bookId && (
                                <div className="mt-3 flex gap-2">
                                  <Button size="sm" asChild>
                                    <Link href={`/book/${notification.bookId}`}>View Book</Link>
                                  </Button>
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href="/wishlist">View Wishlist</Link>
                                  </Button>
                                </div>
                              )}

                            {notification.type === "review_request" && notification.bookId && (
                              <div className="mt-3">
                                <Button size="sm" asChild>
                                  <Link href={`/book/${notification.bookId}#reviews`}>Write Review</Link>
                                </Button>
                              </div>
                            )}

                            {notification.type === "community" && (
                              <div className="mt-3">
                                <Button size="sm" asChild>
                                  <Link href="/community">Join Discussion</Link>
                                </Button>
                              </div>
                            )}

                            {(notification.type === "order_confirmation" ||
                              notification.type === "order_update" ||
                              notification.type === "seller_sale") &&
                              notification.orderId && (
                                <div className="mt-3">
                                  <Button size="sm" asChild>
                                    <Link href={`/my-orders?orderId=${notification.orderId}`}>View Order</Link>
                                  </Button>
                                </div>
                              )}

                            {(notification.type === "rental_confirmation" || notification.type === "rental_reminder") &&
                              notification.rentalId && (
                                <div className="mt-3">
                                  <Button size="sm" asChild>
                                    <Link href={`/my-rentals?rentalId=${notification.rentalId}`}>View Rental</Link>
                                  </Button>
                                </div>
                              )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
