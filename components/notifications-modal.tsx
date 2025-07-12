"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, Heart, Calendar, Star, BookOpen, Check, X } from "lucide-react"
import Link from "next/link"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock notifications data (same as in notifications page)
const notifications = [
  {
    id: 1,
    type: "wishlist_discount",
    title: "Price Drop Alert!",
    message: "The Midnight Library is now 20% off",
    bookTitle: "The Midnight Library",
    bookId: 1,
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    type: "wishlist_available",
    title: "Book Now Available!",
    message: "Dune by Frank Herbert is back in stock",
    bookTitle: "Dune",
    bookId: 3,
    timestamp: "2024-01-14T15:45:00Z",
    isRead: false,
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    type: "rental_reminder",
    title: "Rental Due Soon",
    message: "Your rental of 'Atomic Habits' is due in 2 days",
    bookTitle: "Atomic Habits",
    bookId: 2,
    timestamp: "2024-01-14T09:00:00Z",
    isRead: true,
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 4,
    type: "review_request",
    title: "Review Request",
    message: "How was your experience with 'The Psychology of Money'?",
    bookTitle: "The Psychology of Money",
    bookId: 4,
    timestamp: "2024-01-13T14:20:00Z",
    isRead: true,
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id))
  }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && <Badge className="bg-red-500 h-5 px-2 text-xs">{unreadCount}</Badge>}
          </DialogTitle>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/notifications" onClick={onClose}>
                View All
              </Link>
            </Button>
          </div>
        </DialogHeader>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notificationList.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground text-sm">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notificationList.slice(0, 5).map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-sm ${
                      !notification.isRead ? "border-l-4 border-l-amber-500 bg-amber-50/30" : ""
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className={`p-1.5 rounded-full ${notification.bgColor} flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${notification.color}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                                {notification.title}
                                {!notification.isRead && <Badge className="h-2 w-2 rounded-full p-0 bg-amber-500" />}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                            </div>

                            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Quick action buttons */}
                          {(notification.type === "wishlist_discount" || notification.type === "wishlist_available") &&
                            notification.bookId && (
                              <div className="mt-2 flex gap-1">
                                <Button size="sm" className="h-6 text-xs" asChild onClick={onClose}>
                                  <Link href={`/book/${notification.bookId}`}>View Book</Link>
                                </Button>
                              </div>
                            )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {notificationList.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm" asChild onClick={onClose}>
                    <Link href="/notifications">View {notificationList.length - 5} more notifications</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
