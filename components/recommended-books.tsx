"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, Sparkles, TrendingUp, Clock } from "lucide-react"

const recommendedBooks = {
  "ai-picks": [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 19.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=200",
      reason: "Based on your interest in self-help books",
      match: 95,
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      price: 16.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=200",
      reason: "Similar to books you've enjoyed",
      match: 92,
    },
  ],
  trending: [
    {
      id: 3,
      title: "It Ends with Us",
      author: "Colleen Hoover",
      price: 14.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=200",
      trending: "+45% this week",
    },
    {
      id: 4,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      price: 17.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=200",
      trending: "+32% this week",
    },
  ],
  recent: [
    {
      id: 5,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      price: 21.99,
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=200",
      addedDate: "2 days ago",
    },
    {
      id: 6,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      price: 18.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=200",
      addedDate: "1 week ago",
    },
  ],
}

export function RecommendedBooks() {
  const [activeTab, setActiveTab] = useState("ai-picks")

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended for You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next great read with our AI-powered recommendations and trending picks.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="ai-picks" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Picks
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              New Arrivals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-picks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedBooks["ai-picks"].map((book) => (
                <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {book.match}% Match
                      </Badge>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                        <p className="text-muted-foreground text-sm">{book.author}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{book.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-purple-600 bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                        {book.reason}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">${book.price}</span>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedBooks.trending.map((book) => (
                <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                        <p className="text-muted-foreground text-sm">{book.author}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{book.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        📈 {book.trending}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">${book.price}</span>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedBooks.recent.map((book) => (
                <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        <Clock className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                        <p className="text-muted-foreground text-sm">{book.author}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{book.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                        📅 Added {book.addedDate}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">${book.price}</span>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
