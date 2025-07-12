"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Navigation,
  Heart,
  MessageCircle,
  Eye,
  Truck,
  Package,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
  X,
} from "lucide-react"

interface BookPin {
  id: string
  title: string
  author: string
  condition: "new" | "good" | "used"
  price: number
  isRental: boolean
  rentalPrice?: number
  seller: {
    name: string
    rating: number
    distance: number
  }
  location: {
    lat: number
    lng: number
  }
  image: string
  genre: string
  hasDelivery: boolean
  hasPickup: boolean
  isFavorite: boolean
}

const mockBooks: BookPin[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    condition: "new",
    price: 25,
    isRental: false,
    seller: { name: "Sarah M.", rating: 4.8, distance: 1.2 },
    location: { lat: 40.7128, lng: -74.006 },
    image: "/placeholder.svg?height=80&width=60",
    genre: "Classic Literature",
    hasDelivery: true,
    hasPickup: true,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    condition: "good",
    price: 80,
    isRental: true,
    rentalPrice: 15,
    seller: { name: "Mike K.", rating: 4.9, distance: 2.1 },
    location: { lat: 40.7589, lng: -73.9851 },
    image: "/placeholder.svg?height=80&width=60",
    genre: "Computer Science",
    hasDelivery: false,
    hasPickup: true,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    condition: "used",
    price: 12,
    isRental: false,
    seller: { name: "Emma L.", rating: 4.6, distance: 0.8 },
    location: { lat: 40.7505, lng: -73.9934 },
    image: "/placeholder.svg?height=80&width=60",
    genre: "Romance",
    hasDelivery: true,
    hasPickup: false,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    condition: "good",
    price: 120,
    isRental: true,
    rentalPrice: 25,
    seller: { name: "David R.", rating: 4.7, distance: 3.5 },
    location: { lat: 40.7282, lng: -73.7949 },
    image: "/placeholder.svg?height=80&width=60",
    genre: "Mathematics",
    hasDelivery: true,
    hasPickup: true,
    isFavorite: false,
  },
  {
    id: "5",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    condition: "new",
    price: 18,
    isRental: false,
    seller: { name: "Lisa P.", rating: 4.9, distance: 1.7 },
    location: { lat: 40.7614, lng: -73.9776 },
    image: "/placeholder.svg?height=80&width=60",
    genre: "Classic Literature",
    hasDelivery: false,
    hasPickup: true,
    isFavorite: true,
  },
]

export default function MapPage() {
  const [selectedBook, setSelectedBook] = useState<BookPin | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    condition: "all",
    genre: "all",
    priceRange: [0, 200],
    distance: [10],
    rentalOnly: false,
    saleOnly: false,
    deliveryOnly: false,
    pickupOnly: false,
  })
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoomLevel, setZoomLevel] = useState(12)
  const [showClusters, setShowClusters] = useState(true)
  const [books, setBooks] = useState(mockBooks)

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(newLocation)
          setMapCenter(newLocation)
        },
        () => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-500"
      case "good":
        return "bg-orange-500"
      case "used":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredBooks = books.filter((book) => {
    if (filters.condition !== "all" && book.condition !== filters.condition) return false
    if (filters.genre !== "all" && book.genre !== filters.genre) return false
    if (book.price < filters.priceRange[0] || book.price > filters.priceRange[1]) return false
    if (filters.rentalOnly && !book.isRental) return false
    if (filters.saleOnly && book.isRental) return false
    if (filters.deliveryOnly && !book.hasDelivery) return false
    if (filters.pickupOnly && !book.hasPickup) return false
    if (book.seller.distance > filters.distance[0]) return false
    return true
  })

  const toggleFavorite = (bookId: string) => {
    setBooks(books.map((book) => (book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Book Map</h1>
              <Badge variant="secondary">{filteredBooks.length} books nearby</Badge>
            </div>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-semibold">Book Condition</Label>
                      <Select
                        value={filters.condition}
                        onValueChange={(value) => setFilters({ ...filters, condition: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Conditions</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Genre</Label>
                      <Select value={filters.genre} onValueChange={(value) => setFilters({ ...filters, genre: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genres</SelectItem>
                          <SelectItem value="Classic Literature">Classic Literature</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Romance">Romance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">
                        Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </Label>
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                        max={200}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Distance: {filters.distance[0]}km</Label>
                      <Slider
                        value={filters.distance}
                        onValueChange={(value) => setFilters({ ...filters, distance: value })}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Rentals Only</Label>
                        <Switch
                          checked={filters.rentalOnly}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              rentalOnly: checked,
                              saleOnly: checked ? false : filters.saleOnly,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Sales Only</Label>
                        <Switch
                          checked={filters.saleOnly}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              saleOnly: checked,
                              rentalOnly: checked ? false : filters.rentalOnly,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Delivery Available</Label>
                        <Switch
                          checked={filters.deliveryOnly}
                          onCheckedChange={(checked) => setFilters({ ...filters, deliveryOnly: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Pickup Available</Label>
                        <Switch
                          checked={filters.pickupOnly}
                          onCheckedChange={(checked) => setFilters({ ...filters, pickupOnly: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Map Area */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-800">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
              <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary">
                <Locate className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setShowClusters(!showClusters)}>
                <Layers className="h-4 w-4" />
              </Button>
            </div>

            {/* Condition Legend */}
            <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg">
              <h3 className="font-semibold text-sm mb-2">Book Condition</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">New</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Good</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Used</span>
                </div>
              </div>
            </div>

            {/* Book Pins */}
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${30 + ((index * 15) % 60)}%`,
                  top: `${30 + ((index * 12) % 40)}%`,
                }}
                onClick={() => setSelectedBook(book)}
              >
                <div
                  className={`w-6 h-6 rounded-full ${getConditionColor(book.condition)} border-2 border-white shadow-lg hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                {book.isRental && <Badge className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-blue-500">R</Badge>}
              </div>
            ))}

            {/* User Location */}
            <div
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ left: "50%", top: "50%" }}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full absolute -top-2 -left-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details Panel */}
        {selectedBook && (
          <div className="w-80 border-l bg-background">
            <Card className="h-full rounded-none border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{selectedBook.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">by {selectedBook.author}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedBook(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBook.image || "/placeholder.svg"}
                    alt={selectedBook.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={selectedBook.condition === "new" ? "default" : "secondary"}>
                        {selectedBook.condition}
                      </Badge>
                      <Badge variant="outline">{selectedBook.genre}</Badge>
                    </div>
                    <div className="text-lg font-semibold">
                      {selectedBook.isRental ? (
                        <div>
                          <span className="text-blue-600">${selectedBook.rentalPrice}/month</span>
                          <div className="text-sm text-muted-foreground">Buy: ${selectedBook.price}</div>
                        </div>
                      ) : (
                        <span>${selectedBook.price}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Seller Information</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedBook.seller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ⭐ {selectedBook.seller.rating} • {selectedBook.seller.distance}km away
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedBook.id)}>
                      <Heart className={`h-4 w-4 ${selectedBook.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <div className="flex space-x-2">
                    {selectedBook.hasDelivery && (
                      <Badge variant="outline" className="text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        Delivery
                      </Badge>
                    )}
                    {selectedBook.hasPickup && (
                      <Badge variant="outline" className="text-xs">
                        <Package className="w-3 h-3 mr-1" />
                        Pickup
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Seller
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
