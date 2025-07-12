"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Search,
  Star,
  ShoppingCart,
  Calendar,
  MapPin,
  Trash2,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"

// Mock wishlist data
const wishlistBooks = [
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
    dateAdded: "2024-01-15",
    isDiscounted: true,
    originalPrice: 18.99,
    isAvailable: true,
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
    dateAdded: "2024-01-10",
    isDiscounted: false,
    isAvailable: true,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: 22.99,
    rentPrice: 5.99,
    rating: 4.7,
    reviews: 3421,
    condition: "Very Good",
    image: "/placeholder.svg?height=300&width=200",
    seller: "SciFiFan",
    location: "3.1 miles away",
    isRentable: true,
    category: "Sci-Fi",
    publishYear: 1965,
    badges: ["Classic"],
    dateAdded: "2024-01-05",
    isDiscounted: false,
    isAvailable: false,
  },
]

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-added")
  const [showFilters, setShowFilters] = useState(false)
  const [books, setBooks] = useState(wishlistBooks)

  const removeFromWishlist = (bookId: number) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "date-added":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {books.length} book{books.length !== 1 ? "s" : ""} saved for later
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {books.filter((book) => book.isDiscounted).length} Discounted
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {books.filter((book) => !book.isAvailable).length} Unavailable
              </Badge>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search your wishlist..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
            <span className="text-muted-foreground">
              Showing {sortedBooks.length} of {books.length} books
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added">Recently Added</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {sortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">{searchQuery ? "No books found" : "Your wishlist is empty"}</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search terms" : "Start adding books you love to your wishlist"}
            </p>
            <Button asChild>
              <Link href="/marketplace">Browse Books</Link>
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {sortedBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                          {book.isDiscounted && <Badge className="text-xs bg-red-500 hover:bg-red-600">Sale!</Badge>}
                          {!book.isAvailable && <Badge className="text-xs bg-gray-500">Unavailable</Badge>}
                          {book.badges.map((badge, index) => (
                            <Badge key={index} className="text-xs bg-amber-500 hover:bg-amber-600">
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => removeFromWishlist(book.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
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
                            <div className="flex items-center gap-2">
                              {book.isDiscounted && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${book.originalPrice}
                                </span>
                              )}
                              <span
                                className={`text-2xl font-bold ${book.isDiscounted ? "text-red-600" : "text-green-600"}`}
                              >
                                ${book.price}
                              </span>
                            </div>
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
                            <p>Added: {new Date(book.dateAdded).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-amber-600 hover:bg-amber-700"
                            disabled={!book.isAvailable}
                            asChild={book.isAvailable}
                          >
                            {book.isAvailable ? (
                              <Link href={`/book/${book.id}`}>
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Buy
                              </Link>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Unavailable
                              </>
                            )}
                          </Button>
                          {book.isRentable && book.isAvailable && (
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                              <Link href={`/book/${book.id}`}>
                                <Calendar className="w-4 h-4 mr-1" />
                                Rent
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex p-4 space-x-4">
                      <div className="relative">
                        <img
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          className="w-24 h-32 object-cover rounded"
                        />
                        {book.isDiscounted && (
                          <Badge className="absolute -top-1 -right-1 text-xs bg-red-500">Sale!</Badge>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{book.title}</h3>
                            <p className="text-muted-foreground">{book.author}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromWishlist(book.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
                          <div className="flex items-center gap-2">
                            {book.isDiscounted && (
                              <span className="text-sm text-muted-foreground line-through">${book.originalPrice}</span>
                            )}
                            <span
                              className={`text-2xl font-bold ${book.isDiscounted ? "text-red-600" : "text-green-600"}`}
                            >
                              ${book.price}
                            </span>
                            {book.isRentable && (
                              <span className="text-sm text-blue-600 ml-4">Rent: ${book.rentPrice}/week</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-amber-600 hover:bg-amber-700"
                              disabled={!book.isAvailable}
                              asChild={book.isAvailable}
                            >
                              {book.isAvailable ? (
                                <Link href={`/book/${book.id}`}>
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Buy
                                </Link>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Unavailable
                                </>
                              )}
                            </Button>
                            {book.isRentable && book.isAvailable && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/book/${book.id}`}>
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Rent
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <p>
                            Seller: {book.seller} • {book.location} • Added:{" "}
                            {new Date(book.dateAdded).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
