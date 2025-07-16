"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  Wallet,
  ShoppingCart,
  BookText,
  MessageCircle,
  Star,
  Award,
  Leaf,
  DollarSign,
  Package,
  Calendar,
  Settings,
  Plus,
  TrendingUp,
  Heart,
  Shield,
  Crown,
  Zap,
  Target,
  Gift,
} from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"

// Mock user data that syncs with settings
const getUserData = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("userProfile")
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  }
  
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2024",
    totalOrders: 12,
    totalRentals: 8,
    totalSold: 5,
    moneySaved: 245.50,
    ecoPoints: 89,
    sellerRating: 4.8,
    buyerRating: 4.9,
    totalReviews: 23,
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem("userProfile", JSON.stringify(defaultUser))
  }
  
  return defaultUser
}

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: "First Purchase",
    description: "Made your first book purchase",
    icon: ShoppingCart,
    color: "bg-blue-500",
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Eco Warrior",
    description: "Saved 50+ books from waste",
    icon: Leaf,
    color: "bg-green-500",
    earned: true,
    earnedDate: "2024-02-20",
  },
  {
    id: 3,
    title: "Trusted Seller",
    description: "Maintained 4.5+ seller rating",
    icon: Shield,
    color: "bg-amber-500",
    earned: true,
    earnedDate: "2024-03-10",
  },
  {
    id: 4,
    title: "Book Collector",
    description: "Purchase 25 books",
    icon: Crown,
    color: "bg-purple-500",
    earned: false,
    progress: 12,
    target: 25,
  },
  {
    id: 5,
    title: "Speed Reader",
    description: "Rent 20 books in a month",
    icon: Zap,
    color: "bg-orange-500",
    earned: false,
    progress: 8,
    target: 20,
  },
  {
    id: 6,
    title: "Community Helper",
    description: "Help 100 community members",
    icon: Heart,
    color: "bg-pink-500",
    earned: false,
    progress: 45,
    target: 100,
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    type: "purchase",
    title: "The Midnight Library",
    author: "Matt Haig",
    image: "/placeholder.svg?height=60&width=40",
    date: "2024-01-15",
    amount: 15.99,
  },
  {
    id: 2,
    type: "rental",
    title: "Atomic Habits",
    author: "James Clear",
    image: "/placeholder.svg?height=60&width=40",
    date: "2024-01-12",
    amount: 4.99,
  },
  {
    id: 3,
    type: "sale",
    title: "1984",
    author: "George Orwell",
    image: "/placeholder.svg?height=60&width=40",
    date: "2024-01-10",
    amount: 12.50,
  },
]

// Mock recent chats
const recentChats = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Is the book still available?",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Thanks for the quick delivery!",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "When can I pick up the book?",
    time: "2 days ago",
    unread: false,
  },
]

// Mock reviews
const recentReviews = [
  {
    id: 1,
    reviewer: "BookLover92",
    rating: 5,
    comment: "Great seller! Book was exactly as described and shipped quickly.",
    date: "2024-01-14",
    type: "seller",
  },
  {
    id: 2,
    reviewer: "ReadingFan",
    rating: 5,
    comment: "Excellent buyer, quick payment and great communication.",
    date: "2024-01-12",
    type: "buyer",
  },
  {
    id: 3,
    reviewer: "BookCollector",
    rating: 4,
    comment: "Smooth transaction, would definitely buy from again.",
    date: "2024-01-10",
    type: "seller",
  },
]

export default function ProfilePage() {
  const [userData, setUserData] = useState(getUserData())
  const { balance } = useWallet()

  // Sync with settings changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(getUserData())
    }

    window.addEventListener("storage", handleStorageChange)
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentData = getUserData()
      setUserData(currentData)
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />
      case "rental":
        return <Calendar className="w-4 h-4 text-green-500" />
      case "sale":
        return <DollarSign className="w-4 h-4 text-amber-500" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "purchase":
        return "Purchased"
      case "rental":
        return "Rented"
      case "sale":
        return "Sold"
      default:
        return "Activity"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.name}</h1>
              <div className="space-y-2 text-muted-foreground mb-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <User className="w-4 h-4" />
                  <span>Member since {userData.joinDate}</span>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{userData.sellerRating}</span>
                  <span className="text-muted-foreground text-sm">Seller Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                  <span className="font-semibold">{userData.buyerRating}</span>
                  <span className="text-muted-foreground text-sm">Buyer Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">{userData.totalReviews}</span>
                  <span className="text-muted-foreground text-sm">Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Wallet Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-600" />
                  Wallet Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-3xl font-bold text-amber-600">${balance.toFixed(2)}</p>
                  </div>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/wallet">
                      <Plus className="w-4 h-4 mr-2" />
                      Recharge Wallet
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{userData.totalOrders}</div>
                    <div className="text-sm text-muted-foreground">Books Bought</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{userData.totalRentals}</div>
                    <div className="text-sm text-muted-foreground">Books Rented</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <DollarSign className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-amber-600">{userData.totalSold}</div>
                    <div className="text-sm text-muted-foreground">Books Sold</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">${userData.moneySaved}</div>
                    <div className="text-sm text-muted-foreground">Money Saved</div>
                  </div>
                </div>

                {/* Eco-friendly Badge */}
                <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">Eco Points: {userData.ecoPoints}</div>
                    <div className="text-sm text-muted-foreground">You've helped save the environment!</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getActivityIcon(activity.type)}
                          <span className="font-medium">{getActivityLabel(activity.type)}</span>
                        </div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.author}</p>
                        <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">${activity.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ratings & Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <Badge variant={review.type === "seller" ? "default" : "secondary"}>
                            {review.type === "seller" ? "As Seller" : "As Buyer"}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/my-orders">
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/my-rentals">
                    <BookText className="w-4 h-4 mr-2" />
                    My Rentals
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/chats">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    My Chats
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Chats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-amber-600" />
                  Recent Chats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{chat.name}</p>
                          {chat.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-red-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.slice(0, 6).map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg text-center ${
                          achievement.earned
                            ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950"
                            : "bg-muted/50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            achievement.earned ? achievement.color : "bg-gray-400"
                          }`}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-xs mb-1">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <Badge className="text-xs bg-green-100 text-green-800">
                            Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                          </Badge>
                        ) : (
                          <div className="space-y-1">
                            <Progress 
                              value={(achievement.progress! / achievement.target!) * 100} 
                              className="h-1"
                            />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress}/{achievement.target}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}