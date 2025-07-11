"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Grid, List, MapPin, Star, Heart, ShoppingCart, Calendar, SlidersHorizontal } from "lucide-react"

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 15.99,
    rentPrice: 3.99,
    rating: 4.8,
    reviews: 1234,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    seller: "BookLover123",
    location: "2.3 miles away",
    isRentable: true,
    category: "Fiction",
    publishYear: 2020,
    badges: ["Bestseller"],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    rentPrice: 4.99,
    rating: 4.9,
    reviews: 2156,
    condition: "Good",
    image: "/placeholder.svg?height=300&width=200",
    seller: "ReadingGuru",
    location: "1.8 miles away",
    isRentable: true,
    category: "Self-Help",
    publishYear: 2018,
    badges: ["Popular"],
  },
  // Add more books...
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Marketplace</h1>
          <p className="text-muted-foreground mb-6">Discover amazing books from your local community</p>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search books, authors, ISBN..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Category Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="self-help">Self-Help</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Condition</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="very-good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="acceptable">Acceptable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Availability</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="for-sale" />
                      <label htmlFor="for-sale" className="text-sm">
                        For Sale
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="for-rent" />
                      <label htmlFor="for-rent" className="text-sm">
                        For Rent
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nearby" />
                      <label htmlFor="nearby" className="text-sm">
                        Nearby Only
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <span className="text-muted-foreground">Showing {books.length} results</span>
              </div>

              <div className="flex items-center gap-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="distance">Nearest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Books Grid/List */}
            <Tabs value="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All Books</TabsTrigger>
                <TabsTrigger value="sale">For Sale</TabsTrigger>
                <TabsTrigger value="rent">For Rent</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {books.map((book) => (
                    <Card
                      key={book.id}
                      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <CardContent className="p-0">
                        {viewMode === "grid" ? (
                          <>
                            <div className="relative overflow-hidden rounded-t-lg">
                              <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Badges */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {book.badges.map((badge, index) => (
                                  <Badge key={index} className="text-xs bg-amber-500 hover:bg-amber-600">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>

                              {/* Action Buttons */}
                              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="secondary">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="secondary">
                                  <MapPin className="w-4 h-4" />
                                </Button>
                              </div>
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
                                <span className="text-xs text-muted-foreground">({book.reviews})</span>
                                <Badge variant="outline" className="text-xs">
                                  {book.condition}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold text-green-600">${book.price}</span>
                                  {book.isRentable && (
                                    <span className="text-sm text-blue-600">Rent: ${book.rentPrice}/week</span>
                                  )}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                  <p>Seller: {book.seller}</p>
                                  <p className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {book.location}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Buy
                                </Button>
                                {book.isRentable && (
                                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Rent
                                  </Button>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex p-4 space-x-4">
                            <img
                              src={book.image || "/placeholder.svg"}
                              alt={book.title}
                              className="w-24 h-32 object-cover rounded"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{book.title}</h3>
                                  <p className="text-muted-foreground">{book.author}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Button size="icon" variant="ghost">
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost">
                                    <MapPin className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium ml-1">{book.rating}</span>
                                  <span className="text-xs text-muted-foreground ml-1">({book.reviews})</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {book.condition}
                                </Badge>
                                {book.badges.map((badge, index) => (
                                  <Badge key={index} className="text-xs bg-amber-500">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-2xl font-bold text-green-600">${book.price}</span>
                                  {book.isRentable && (
                                    <span className="text-sm text-blue-600 ml-4">Rent: ${book.rentPrice}/week</span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                    Buy
                                  </Button>
                                  {book.isRentable && (
                                    <Button size="sm" variant="outline">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      Rent
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="text-xs text-muted-foreground">
                                <p>
                                  Seller: {book.seller} • {book.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Books
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
