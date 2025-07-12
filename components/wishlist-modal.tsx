"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Heart, Search, Star, Trash2 } from "lucide-react"
import Link from "next/link"

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock wishlist data (same as in wishlist page)
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
]

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [books, setBooks] = useState(wishlistBooks)

  const removeFromWishlist = (bookId: number) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            My Wishlist ({books.length})
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {books.filter((book) => book.isDiscounted).length} On Sale
            </Badge>
            <Button asChild variant="outline" size="sm">
              <Link href="/wishlist" onClick={onClose}>
                View All
              </Link>
            </Button>
          </div>
        </DialogHeader>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search your wishlist..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Books List */}
        <div className="flex-1 overflow-y-auto">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold mb-2">{searchQuery ? "No books found" : "Your wishlist is empty"}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Start adding books you love to your wishlist"}
              </p>
              {!searchQuery && (
                <Button asChild onClick={onClose}>
                  <Link href="/marketplace">Browse Books</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <div className="relative">
                        <img
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        {book.isDiscounted && (
                          <Badge className="absolute -top-1 -right-1 text-xs bg-red-500 h-4 px-1">Sale!</Badge>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{book.title}</h4>
                            <p className="text-xs text-muted-foreground">{book.author}</p>

                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs ml-1">{book.rating}</span>
                              </div>
                              <Badge variant="outline" className="text-xs h-4 px-1">
                                {book.condition}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              {book.isDiscounted && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${book.originalPrice}
                                </span>
                              )}
                              <span
                                className={`text-sm font-bold ${book.isDiscounted ? "text-red-600" : "text-green-600"}`}
                              >
                                ${book.price}
                              </span>
                              {book.isRentable && (
                                <span className="text-xs text-blue-600">Rent: ${book.rentPrice}/week</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromWishlist(book.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-1 mt-2">
                          <Button
                            size="sm"
                            className="h-6 text-xs bg-amber-600 hover:bg-amber-700"
                            disabled={!book.isAvailable}
                            asChild={book.isAvailable}
                            onClick={onClose}
                          >
                            {book.isAvailable ? <Link href={`/book/${book.id}`}>Buy</Link> : <>Unavailable</>}
                          </Button>
                          {book.isRentable && book.isAvailable && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-xs bg-transparent"
                              asChild
                              onClick={onClose}
                            >
                              <Link href={`/book/${book.id}`}>Rent</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
