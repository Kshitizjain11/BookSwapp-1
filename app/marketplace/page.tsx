"use client"

import { useState, useMemo } from "react"
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
    genre: "Philosophy",
    publishYear: 2020,
    badges: ["Bestseller"],
    isbn: "978-0525559474",
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
    genre: "Self-Help",
    publishYear: 2018,
    badges: ["Popular"],
    isbn: "978-0735211292",
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
    category: "Fiction",
    genre: "Science Fiction",
    publishYear: 1965,
    badges: ["Classic"],
    isbn: "978-0441172719",
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 16.99,
    rentPrice: 4.49,
    rating: 4.6,
    reviews: 1876,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    seller: "FinanceReader",
    location: "1.2 miles away",
    isRentable: true,
    category: "Business",
    genre: "Finance",
    publishYear: 2020,
    badges: ["Trending"],
    isbn: "978-0857197689",
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 19.99,
    rentPrice: 5.49,
    rating: 4.9,
    reviews: 2987,
    condition: "New",
    image: "/placeholder.svg?height=300&width=200",
    seller: "BookCollector",
    location: "2.7 miles away",
    isRentable: false,
    category: "Fiction",
    genre: "Science Fiction",
    publishYear: 2021,
    badges: ["New Release"],
    isbn: "978-0593135204",
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    price: 14.99,
    rentPrice: 3.99,
    rating: 4.5,
    reviews: 4521,
    condition: "Good",
    image: "/placeholder.svg?height=300&width=200",
    seller: "MemoirLover",
    location: "4.1 miles away",
    isRentable: true,
    category: "Biography",
    genre: "Memoir",
    publishYear: 2018,
    badges: ["Award Winner"],
    isbn: "978-0399590504",
  },
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [selectedAuthor, setSelectedAuthor] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [showRentableOnly, setShowRentableOnly] = useState(false)
  const [showNearbyOnly, setShowNearbyOnly] = useState(false)
  const [wishlistedBooks, setWishlistedBooks] = useState<number[]>([])

  // Get unique values for filters
  const categories = [...new Set(books.map((book) => book.category))]
  const genres = [...new Set(books.map((book) => book.genre))]
  const conditions = [...new Set(books.map((book) => book.condition))]
  const authors = [...new Set(books.map((book) => book.author))]

  // Filter and search logic
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())

      // Price filter
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]

      // Category filter
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory

      // Genre filter
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre

      // Condition filter
      const matchesCondition = selectedCondition === "all" || book.condition === selectedCondition

      // Author filter
      const matchesAuthor = selectedAuthor === "all" || book.author === selectedAuthor

      // Rentable filter
      const matchesRentable = !showRentableOnly || book.isRentable

      // Nearby filter (simplified - in real app would use actual location)
      const matchesNearby = !showNearbyOnly || Number.parseFloat(book.location.split(" ")[0]) <= 3

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCategory &&
        matchesGenre &&
        matchesCondition &&
        matchesAuthor &&
        matchesRentable &&
        matchesNearby
      )
    })
  }, [
    searchQuery,
    priceRange,
    selectedCategory,
    selectedGenre,
    selectedCondition,
    selectedAuthor,
    showRentableOnly,
    showNearbyOnly,
  ])

  // Sort logic
  const sortedBooks = useMemo(() => {
    const sorted = [...filteredBooks]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => b.publishYear - a.publishYear)
      case "distance":
        return sorted.sort(
          (a, b) => Number.parseFloat(a.location.split(" ")[0]) - Number.parseFloat(b.location.split(" ")[0]),
        )
      default:
        return sorted
    }
  }, [filteredBooks, sortBy])

  const toggleWishlist = (bookId: number) => {
    setWishlistedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 50])
    setSelectedCategory("all")
    setSelectedGenre("all")
    setSelectedCondition("all")
    setSelectedAuthor("all")
    setShowRentableOnly(false)
    setShowNearbyOnly(false)
  }

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
                placeholder="Search books, authors, ISBN, genres..."
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Genre Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Genre</label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Author Filter */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Author</label>
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Authors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Authors</SelectItem>
                      {authors.map((author) => (
                        <SelectItem key={author} value={author}>
                          {author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={50} step={1} className="w-full" />
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
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Availability</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="for-rent" checked={showRentableOnly} onCheckedChange={setShowRentableOnly} />
                      <label htmlFor="for-rent" className="text-sm">
                        Rentable Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nearby" checked={showNearbyOnly} onCheckedChange={setShowNearbyOnly} />
                      <label htmlFor="nearby" className="text-sm">
                        Nearby Only (within 3 miles)
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
                <span className="text-muted-foreground">
                  Showing {sortedBooks.length} of {books.length} results
                </span>
                {(searchQuery ||
                  selectedCategory !== "all" ||
                  selectedGenre !== "all" ||
                  selectedCondition !== "all" ||
                  selectedAuthor !== "all" ||
                  showRentableOnly ||
                  showNearbyOnly ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 50) && <Badge variant="secondary">Filters applied</Badge>}
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
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
                {sortedBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No books found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search terms or filters</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }
                  >
                    {sortedBooks.map((book) => (
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
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => toggleWishlist(book.id)}
                                    className={wishlistedBooks.includes(book.id) ? "bg-red-100 text-red-600" : ""}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${wishlistedBooks.includes(book.id) ? "fill-current" : ""}`}
                                    />
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
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => toggleWishlist(book.id)}
                                      className={wishlistedBooks.includes(book.id) ? "text-red-600" : ""}
                                    >
                                      <Heart
                                        className={`w-4 h-4 ${wishlistedBooks.includes(book.id) ? "fill-current" : ""}`}
                                      />
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
                                    Seller: {book.seller} • {book.location} • {book.genre}
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
              </TabsContent>
            </Tabs>

            {/* Load More */}
            {sortedBooks.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Books
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
