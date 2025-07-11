"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, CalendarIcon, Star, MapPin, Clock, ShoppingCart, Filter, Grid, List } from "lucide-react"
import { format, differenceInDays } from "date-fns"

const rentableBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    dailyRate: 2.99,
    weeklyRate: 15.99,
    rating: 4.8,
    reviews: 234,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    owner: "BookLover123",
    location: "2.3 miles away",
    availability: "Available",
    category: "Fiction",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    dailyRate: 3.49,
    weeklyRate: 18.99,
    rating: 4.9,
    reviews: 456,
    condition: "Good",
    image: "/placeholder.svg?height=300&width=200",
    owner: "ReadingGuru",
    location: "1.8 miles away",
    availability: "Available",
    category: "Self-Help",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    dailyRate: 2.49,
    weeklyRate: 12.99,
    rating: 4.7,
    reviews: 189,
    condition: "Very Good",
    image: "/placeholder.svg?height=300&width=200",
    owner: "SciFiFan",
    location: "3.1 miles away",
    availability: "Available",
    category: "Sci-Fi",
  },
]

export default function RentBooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [rentalType, setRentalType] = useState<"daily" | "weekly">("weekly")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const calculateRentalPrice = (book: any, start: Date, end: Date, type: "daily" | "weekly") => {
    if (!start || !end) return 0

    const days = differenceInDays(end, start) + 1

    if (type === "daily") {
      return days * book.dailyRate
    } else {
      const weeks = Math.ceil(days / 7)
      return weeks * book.weeklyRate
    }
  }

  const handleRentBook = () => {
    if (!selectedBook || !startDate || !endDate) return

    const totalPrice = calculateRentalPrice(selectedBook, startDate, endDate, rentalType)

    // Here you would typically handle the rental booking
    alert(
      `Rental booked for ${selectedBook.title} from ${format(startDate, "PPP")} to ${format(endDate, "PPP")} for $${totalPrice.toFixed(2)}`,
    )

    // Reset form
    setSelectedBook(null)
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Rent Books</h1>
          <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Discover amazing books for short-term reading. Perfect for trying new genres or authors!
          </p>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search rentable books..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                <SelectItem value="self-help">Self-Help</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="available">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="soon">Available Soon</SelectItem>
                <SelectItem value="all">All Books</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="price-low">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
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

        {/* Books Grid */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {rentableBooks.map((book) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Rentable
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-green-500">{book.availability}</Badge>
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
                          <div>
                            <div className="text-sm text-blue-600 font-medium">${book.dailyRate}/day</div>
                            <div className="text-lg font-bold text-blue-600">${book.weeklyRate}/week</div>
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

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => setSelectedBook(book)}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Rent This Book
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Rent "{book.title}"</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-semibold">{book.title}</h4>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                                <p className="text-sm text-muted-foreground">by {book.owner}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Rental Period</label>
                                <Tabs value={rentalType} onValueChange={(value: any) => setRentalType(value)}>
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="daily">Daily (${book.dailyRate}/day)</TabsTrigger>
                                    <TabsTrigger value="weekly">Weekly (${book.weeklyRate}/week)</TabsTrigger>
                                  </TabsList>
                                </Tabs>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left bg-transparent"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <div>
                                  <label className="text-sm font-medium mb-2 block">End Date</label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left bg-transparent"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        disabled={(date) => !startDate || date < startDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>

                              {startDate && endDate && (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Total Cost:</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                      ${calculateRentalPrice(book, startDate, endDate, rentalType).toFixed(2)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {differenceInDays(endDate, startDate) + 1} days
                                    {rentalType === "weekly" &&
                                      ` (${Math.ceil((differenceInDays(endDate, startDate) + 1) / 7)} weeks)`}
                                  </p>
                                </div>
                              )}

                              <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={handleRentBook}
                                disabled={!startDate || !endDate}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Confirm Rental
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                        <div className="flex gap-2">
                          <Badge className="bg-blue-500">Rentable</Badge>
                          <Badge className="bg-green-500">{book.availability}</Badge>
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
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-blue-600">${book.dailyRate}/day</div>
                          <div className="text-lg font-bold text-blue-600">${book.weeklyRate}/week</div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setSelectedBook(book)}>
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Rent
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">{/* Same dialog content as above */}</DialogContent>
                        </Dialog>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>
                          Owner: {book.owner} • {book.location}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Books
          </Button>
        </div>
      </div>
    </div>
  )
}
