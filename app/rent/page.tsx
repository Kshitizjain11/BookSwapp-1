"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RentalConfirmationModal } from "@/components/rental-confirmation-modal"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"
import { format, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Star, Heart, MapPin, Calendar as CalendarIcon, SlidersHorizontal, Search, Grid, List, Clock, Shield } from "lucide-react"

// Mock rental books data
const rentalBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    dailyRate: 0.99,
    weeklyRate: 3.99,
    rating: 4.8,
    reviews: 1234,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    owner: "BookLover123",
    location: "2.3 miles away",
    category: "Fiction",
    genre: "Philosophy",
    publishYear: 2020,
    badges: ["Bestseller"],
    isbn: "978-0525559474",
    availableFrom: new Date(),
    maxRentalDays: 30,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    dailyRate: 1.49,
    weeklyRate: 4.99,
    rating: 4.9,
    reviews: 2156,
    condition: "Good",
    image: "/placeholder.svg?height=300&width=200",
    owner: "ReadingGuru",
    location: "1.8 miles away",
    category: "Self-Help",
    genre: "Self-Help",
    publishYear: 2018,
    badges: ["Popular"],
    isbn: "978-0735211292",
    availableFrom: addDays(new Date(), 2),
    maxRentalDays: 21,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    dailyRate: 1.99,
    weeklyRate: 5.99,
    rating: 4.7,
    reviews: 3421,
    condition: "Very Good",
    image: "/placeholder.svg?height=300&width=200",
    owner: "SciFiFan",
    location: "3.1 miles away",
    category: "Fiction",
    genre: "Science Fiction",
    publishYear: 1965,
    badges: ["Classic"],
    isbn: "978-0441172719",
    availableFrom: new Date(),
    maxRentalDays: 14,
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    dailyRate: 1.29,
    weeklyRate: 4.49,
    rating: 4.6,
    reviews: 1876,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    owner: "FinanceReader",
    location: "1.2 miles away",
    category: "Business",
    genre: "Finance",
    publishYear: 2020,
    badges: ["Trending"],
    isbn: "978-0857197689",
    availableFrom: addDays(new Date(), 1),
    maxRentalDays: 28,
  },
]

interface RentalModalProps {
  book: (typeof rentalBooks)[number]
  isOpen: boolean
  onClose: () => void
}

function RentalModal({ book, isOpen, onClose }: RentalModalProps) {
  const { addToCart } = useCart()
  const [days, setDays] = useState(7)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  })

  const calculatePrice = (days: number) => {
    // If daily rate is not defined, calculate it as 1/5th of weekly rate (assuming 5-day work week)
    const dailyRate = book.dailyRate || (book.weeklyRate / 5)
    
    if (days < 7) {
      // For rentals less than a week, use daily rate
      return Math.ceil(dailyRate * days * 100) / 100 // Round to 2 decimal places
    } else {
      // For a week or more, use weekly rate with daily rate for remaining days
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      const weeklyTotal = weeks * book.weeklyRate
      const dailyTotal = remainingDays > 0 ? Math.ceil(dailyRate * remainingDays * 100) / 100 : 0
      return parseFloat((weeklyTotal + dailyTotal).toFixed(2))
    }
  }

  const handleDaysChange = (newDays: number) => {
    setDays(newDays)
    const end = new Date(startDate)
    end.setDate(startDate.getDate() + newDays)
    setEndDate(end)
  }

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
    const end = new Date(date)
    end.setDate(date.getDate() + days)
    setEndDate(end)
  }

  const handleRentNow = () => {
    const totalPrice = calculatePrice(days)
    const isWeekly = days >= 7
    const rate = isWeekly ? book.weeklyRate : (book.dailyRate || (book.weeklyRate / 5))
    const rateType = isWeekly ? 'week' : 'day'
    
    addToCart({
      id: book.id.toString(),
      title: book.title,
      author: book.author,
      price: totalPrice,
      rentPrice: rate,
      rentPriceType: rateType,
      image: book.image,
      condition: book.condition || 'Good',
      quantity: 1,
      type: 'rent',
      rentalDuration: days,
      rentalStartDate: startDate.toISOString(),
      rentalEndDate: endDate.toISOString(),
      seller: book.owner || 'Marketplace',
    })
    
    toast({
      title: 'Rental Added to Cart',
      description: `${book.title} has been added to your cart as a rental for ${days} days.`,
      variant: 'default',
    })
    
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Rent {book.title}</DialogTitle>
          <DialogDescription>
            Complete your rental details for {book.title} by {book.author}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && handleStartDateChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rental Duration</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={days === 1 ? "default" : "outline"} 
                  onClick={() => handleDaysChange(1)}
                >
                  1 Day (${(book.dailyRate || (book.weeklyRate / 5)).toFixed(2)})
                </Button>
                <Button 
                  variant={days === 3 ? "default" : "outline"} 
                  onClick={() => handleDaysChange(3)}
                >
                  3 Days (${((book.dailyRate || (book.weeklyRate / 5)) * 3).toFixed(2)})
                </Button>
                <Button 
                  variant={days === 7 ? "default" : "outline"} 
                  onClick={() => handleDaysChange(7)}
                >
                  1 Week (${book.weeklyRate.toFixed(2)})
                </Button>
                <Button 
                  variant={days === 14 ? "default" : "outline"} 
                  onClick={() => handleDaysChange(14)}
                >
                  2 Weeks (${(book.weeklyRate * 2).toFixed(2)})
                </Button>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">Custom Duration (Days)</label>
                <Input 
                  type="number" 
                  min="1" 
                  max={book.maxRentalDays || 30}
                  value={days}
                  onChange={(e) => handleDaysChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Rental Summary</h3>
            <div className="flex justify-between">
              <span>Daily Rate:</span>
              <span>${(book.dailyRate || (book.weeklyRate / 5)).toFixed(2)}/day</span>
            </div>
            <div className="flex justify-between">
              <span>Weekly Rate:</span>
              <span>${book.weeklyRate.toFixed(2)}/week</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{days} day{days !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Total:</span>
              <span>${calculatePrice(days).toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Rent ends on: {format(endDate, 'PPP')}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-amber-600 hover:bg-amber-700"
              onClick={handleRentNow}
            >
              Confirm Rental
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function RentPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [showNearbyOnly, setShowNearbyOnly] = useState(false)
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [wishlistedBooks, setWishlistedBooks] = useState<number[]>([])
  const [selectedBook, setSelectedBook] = useState<(typeof rentalBooks)[number] | null>(null)
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false)
  const { addToCart } = useCart()

  const handleRentClick = (book: (typeof rentalBooks)[number]) => {
    setSelectedBook(book)
    setIsRentalModalOpen(true)
  }

  // Get unique values for filters
  const categories = [...new Set(rentalBooks.map((book) => book.category))]
  const genres = [...new Set(rentalBooks.map((book) => book.genre))]
  const conditions = [...new Set(rentalBooks.map((book) => book.condition))]

  // Filter and search logic
  const filteredBooks = useMemo(() => {
    return rentalBooks.filter((book) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())

      // Price filter (using weekly rate)
      const matchesPrice = book.weeklyRate >= priceRange[0] && book.weeklyRate <= priceRange[1]

      // Category filter
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory

      // Genre filter
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre

      // Condition filter
      const matchesCondition = selectedCondition === "all" || book.condition === selectedCondition

      // Nearby filter
      const matchesNearby = !showNearbyOnly || Number.parseFloat(book.location.split(" ")[0]) <= 3

      // Available filter
      const matchesAvailable = !showAvailableOnly || book.availableFrom <= new Date()

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCategory &&
        matchesGenre &&
        matchesCondition &&
        matchesNearby &&
        matchesAvailable
      )
    })
  }, [searchQuery, priceRange, selectedCategory, selectedGenre, selectedCondition, showNearbyOnly, showAvailableOnly])

  // Sort logic
  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.weeklyRate - b.weeklyRate
        case "price-high":
          return b.weeklyRate - a.weeklyRate
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.publishYear - a.publishYear
        case "distance":
          return Number.parseFloat(a.location.split(" ")[0]) - Number.parseFloat(b.location.split(" ")[0])
        default:
          return 0
      }
    })
  }, [filteredBooks, sortBy])

  const toggleWishlist = (bookId: number) => {
    setWishlistedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 10])
    setSelectedCategory("all")
    setSelectedGenre("all")
    setSelectedCondition("all")
    setShowNearbyOnly(false)
    setShowAvailableOnly(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Rent Books</h1>
          <p className="text-muted-foreground mb-6">Discover books to rent from your local community</p>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search books, authors, genres..."
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

                {/* Price Range (Weekly Rate) */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Weekly Rate</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10} step={0.5} className="w-full" />
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
                      <Checkbox 
                        id="available-now" 
                        checked={showAvailableOnly} 
                        onCheckedChange={(checked) => setShowAvailableOnly(checked === true)} 
                      />
                      <label htmlFor="available-now" className="text-sm">
                        Available Now
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nearby" 
                        checked={showNearbyOnly} 
                        onCheckedChange={(checked) => setShowNearbyOnly(checked === true)} 
                      />
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
                  Showing {sortedBooks.length} of {rentalBooks.length} books
                </span>
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
            {sortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
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
                              {book.availableFrom > new Date() && (
                                <Badge className="text-xs bg-orange-500">
                                  Available {format(book.availableFrom, "MMM d")}
                                </Badge>
                              )}
                              {book.badges.map((badge: string, index: number) => (
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
                                <div className="space-y-1">
                                  <div className="text-lg font-bold text-blue-600">${book.weeklyRate}/week</div>
                                  <div className="text-sm text-muted-foreground">${book.dailyRate}/day</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-muted-foreground">Max {book.maxRentalDays} days</div>
                                </div>
                              </div>

                              <div className="text-xs text-muted-foreground">
                                <p>Owner: {book.owner}</p>
                                <p className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {book.location}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2">
                              <Button
                                size="sm"
                                className="w-full bg-amber-600 hover:bg-amber-700"
                                onClick={() => handleRentClick(book)}
                              >
                                Rent Now
                              </Button>
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
                            {book.availableFrom > new Date() && (
                              <Badge className="absolute -top-1 -right-1 text-xs bg-orange-500">
                                {format(book.availableFrom, "MMM d")}
                              </Badge>
                            )}
                          </div>
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
                                <div className="text-lg font-bold text-blue-600">${book.weeklyRate}/week</div>
                                <div className="text-sm text-muted-foreground">
                                  ${book.dailyRate}/day • Max {book.maxRentalDays} days
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-amber-600 hover:bg-amber-700"
onClick={() => handleRentClick(book)}
                              >
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Rent Now
                              </Button>
                            </div>

                            <div className="text-xs text-muted-foreground">
                              <p>
                                Owner: {book.owner} • {book.location} • {book.genre}
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

      {/* Rental Modal */}
      {selectedBook && (
        <RentalModal 
          book={selectedBook} 
          isOpen={isRentalModalOpen} 
          onClose={() => {
            setIsRentalModalOpen(false)
            setSelectedBook(null)
          }} 
        />
      )}
    </div>
  )
}
