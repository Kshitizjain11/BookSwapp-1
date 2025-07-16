"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Edit,
  Trash2,
  TrendingUp,
  Eye,
  MessageCircle,
  Star,
  Download,
  Calendar,
  Clock,
  Heart,
  ShoppingCart,
  Plus,
  MoreHorizontal,
  Award,
  Grid,
  List,
  Upload,
  DollarSign,
  Package,
  BookOpen,
  User,
  MapPin,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle,
  AlertCircle,
  Timer,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

// Mock data for user's books
const mockListings = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    rentPrice: 3.99,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=150",
    status: "active",
    views: 45,
    interested: 3,
    datePosted: "2024-01-15",
    type: "both", // sell, rent, both
    description: "Classic American literature in excellent condition.",
    isbn: "978-0-7432-7356-5",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    rentPrice: 4.99,
    condition: "Good",
    image: "/placeholder.svg?height=200&width=150",
    status: "inactive",
    views: 23,
    interested: 1,
    datePosted: "2024-01-10",
    type: "sell",
    description: "Self-help book with minor wear on cover.",
    isbn: "978-0-7352-1129-2",
  },
]

const mockPurchasedBooks = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    price: 12.50,
    image: "/placeholder.svg?height=200&width=150",
    seller: "BookLover123",
    sellerAvatar: "/placeholder.svg?height=32&width=32",
    orderDate: "2024-01-20",
    paymentMethod: "Credit Card",
    orderId: "ORD-001",
    rating: 5,
    hasReviewed: true,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 10.99,
    image: "/placeholder.svg?height=200&width=150",
    seller: "ClassicReads",
    sellerAvatar: "/placeholder.svg?height=32&width=32",
    orderDate: "2024-01-18",
    paymentMethod: "Wallet",
    orderId: "ORD-002",
    rating: 0,
    hasReviewed: false,
  },
]

const mockRentedBooks = [
  {
    id: "1",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "/placeholder.svg?height=200&width=150",
    renter: "FantasyFan",
    renterAvatar: "/placeholder.svg?height=32&width=32",
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    rentalPrice: 5.99,
    status: "active",
    daysLeft: 5,
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    image: "/placeholder.svg?height=200&width=150",
    renter: "SciFiReader",
    renterAvatar: "/placeholder.svg?height=32&width=32",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    rentalPrice: 4.99,
    status: "returned",
    daysLeft: 0,
  },
]

const mockWishlist = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    rentPrice: 3.99,
    image: "/placeholder.svg?height=200&width=150",
    seller: "BookHaven",
    condition: "New",
    rating: 4.8,
    available: true,
    dateAdded: "2024-01-10",
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    price: 14.99,
    rentPrice: 3.49,
    image: "/placeholder.svg?height=200&width=150",
    seller: "MemoryBooks",
    condition: "Like New",
    rating: 4.9,
    available: false,
    dateAdded: "2024-01-08",
  },
]

export default function MyBooksPage() {
  const [activeTab, setActiveTab] = useState("listings")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [editingListing, setEditingListing] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [listings, setListings] = useState(mockListings)
  const [purchasedBooks, setPurchasedBooks] = useState(mockPurchasedBooks)
  const [rentedBooks, setRentedBooks] = useState(mockRentedBooks)
  const [wishlist, setWishlist] = useState(mockWishlist)

  const handleToggleStatus = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, status: listing.status === "active" ? "inactive" : "active" }
        : listing
    ))
    toast({
      title: "Status Updated",
      description: "Listing status has been changed.",
    })
  }

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id))
    toast({
      title: "Listing Deleted",
      description: "Your listing has been removed.",
    })
  }

  const handleEditListing = (listing: any) => {
    setEditingListing(listing)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (editingListing) {
      setListings(listings.map(listing => 
        listing.id === editingListing.id ? editingListing : listing
      ))
      setIsEditDialogOpen(false)
      setEditingListing(null)
      toast({
        title: "Listing Updated",
        description: "Your changes have been saved.",
      })
    }
  }

  const handlePromoteListing = (id: string) => {
    toast({
      title: "Listing Promoted",
      description: "Your listing will appear higher in search results.",
    })
  }

  const handleExtendRental = (id: string) => {
    toast({
      title: "Rental Extended",
      description: "Rental period has been extended by 1 week.",
    })
  }

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (item: any) => {
    toast({
      title: "Added to Cart",
      description: `${item.title} has been added to your cart.`,
    })
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to perform bulk actions.",
        variant: "destructive",
      })
      return
    }

    switch (action) {
      case "delete":
        setListings(listings.filter(listing => !selectedItems.includes(listing.id)))
        toast({
          title: "Items Deleted",
          description: `${selectedItems.length} items have been deleted.`,
        })
        break
      case "activate":
        setListings(listings.map(listing => 
          selectedItems.includes(listing.id) 
            ? { ...listing, status: "active" }
            : listing
        ))
        toast({
          title: "Items Activated",
          description: `${selectedItems.length} items have been activated.`,
        })
        break
      case "deactivate":
        setListings(listings.map(listing => 
          selectedItems.includes(listing.id) 
            ? { ...listing, status: "inactive" }
            : listing
        ))
        toast({
          title: "Items Deactivated",
          description: `${selectedItems.length} items have been deactivated.`,
        })
        break
    }
    setSelectedItems([])
  }

  const handleDownloadInventory = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Author,Price,Rent Price,Condition,Status,Views,Interested\n" +
      listings.map(listing => 
        `"${listing.title}","${listing.author}",${listing.price},${listing.rentPrice},"${listing.condition}","${listing.status}",${listing.views},${listing.interested}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "my-books-inventory.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Inventory Downloaded",
      description: "Your book inventory has been downloaded as CSV.",
    })
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="w-4 h-4" />
      case "UPI":
        return <Banknote className="w-4 h-4" />
      case "Wallet":
        return <Wallet className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  const getRentalStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "returned":
        return "text-gray-600"
      case "overdue":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || listing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Books</h1>
              <p className="text-muted-foreground">Manage your book listings, purchases, and rentals.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800">
                <Award className="w-3 h-3 mr-1" />
                Top Seller
              </Badge>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/sell">
                  <Plus className="w-4 h-4 mr-2" />
                  List New Book
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              My Listings ({listings.length})
            </TabsTrigger>
            <TabsTrigger value="purchased" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Purchased ({purchasedBooks.length})
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              My Rentals ({rentedBooks.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wishlist ({wishlist.length})
            </TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings">
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search your listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  {selectedItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedItems.length} selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("activate")}
                      >
                        Activate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("deactivate")}
                      >
                        Deactivate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("delete")}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadInventory}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
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

              {/* Listings Grid/List */}
              {filteredListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? "Try adjusting your search terms" : "Start by listing your first book"}
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/sell">List Your First Book</Link>
                  </Button>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
                }>
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="group hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-0">
                        {viewMode === "grid" ? (
                          <>
                            <div className="relative">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                              />
                              <div className="absolute top-2 left-2">
                                <Checkbox
                                  checked={selectedItems.includes(listing.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedItems([...selectedItems, listing.id])
                                    } else {
                                      setSelectedItems(selectedItems.filter(id => id !== listing.id))
                                    }
                                  }}
                                  className="bg-white"
                                />
                              </div>
                              <div className="absolute top-2 right-2">
                                <Badge className={listing.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                                  {listing.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4 space-y-3">
                              <div>
                                <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground">{listing.author}</p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-lg font-bold text-green-600">${listing.price}</span>
                                  {listing.rentPrice && (
                                    <span className="text-sm text-blue-600 ml-2">
                                      Rent: ${listing.rentPrice}/week
                                    </span>
                                  )}
                                </div>
                                <Badge variant="outline">{listing.condition}</Badge>
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {listing.views}
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {listing.interested}
                                  </span>
                                </div>
                                <Switch
                                  checked={listing.status === "active"}
                                  onCheckedChange={() => handleToggleStatus(listing.id)}
                                  size="sm"
                                />
                              </div>

                              <div className="flex items-center gap-1 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditListing(listing)}
                                  className="flex-1"
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePromoteListing(listing.id)}
                                  className="flex-1"
                                >
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Promote
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeleteListing(listing.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex p-4 space-x-4">
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedItems.includes(listing.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedItems([...selectedItems, listing.id])
                                  } else {
                                    setSelectedItems(selectedItems.filter(id => id !== listing.id))
                                  }
                                }}
                                className="mr-3"
                              />
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{listing.title}</h3>
                                  <p className="text-sm text-muted-foreground">{listing.author}</p>
                                </div>
                                <Badge className={listing.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                                  {listing.status}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-bold text-green-600">${listing.price}</span>
                                  {listing.rentPrice && (
                                    <span className="text-sm text-blue-600">
                                      Rent: ${listing.rentPrice}/week
                                    </span>
                                  )}
                                  <Badge variant="outline">{listing.condition}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {listing.views}
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {listing.interested}
                                  </span>
                                  <Switch
                                    checked={listing.status === "active"}
                                    onCheckedChange={() => handleToggleStatus(listing.id)}
                                    size="sm"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditListing(listing)}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePromoteListing(listing.id)}
                                >
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Promote
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                >
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  Chat
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDeleteListing(listing.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
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
          </TabsContent>

          {/* Purchased Books Tab */}
          <TabsContent value="purchased">
            <div className="space-y-6">
              {purchasedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No purchased books</h3>
                  <p className="text-muted-foreground mb-6">
                    Books you purchase will appear here
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/marketplace">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedBooks.map((book) => (
                    <Card key={book.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex space-x-4">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                            <p className="text-lg font-bold text-green-600">${book.price}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Seller:</span>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={book.sellerAvatar} />
                                <AvatarFallback>
                                  <User className="w-3 h-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span>{book.seller}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Order Date:</span>
                            <span>{new Date(book.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Payment:</span>
                            <div className="flex items-center gap-1">
                              {getPaymentMethodIcon(book.paymentMethod)}
                              <span>{book.paymentMethod}</span>
                            </div>
                          </div>
                        </div>

                        {!book.hasReviewed && (
                          <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                            <Star className="w-4 h-4 text-amber-600" />
                            <span className="text-sm text-amber-800">Rate your experience</span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                          {!book.hasReviewed && (
                            <Button size="sm" variant="outline" className="flex-1">
                              <Star className="w-3 h-3 mr-1" />
                              Review
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Rentals Tab */}
          <TabsContent value="rentals">
            <div className="space-y-6">
              {rentedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active rentals</h3>
                  <p className="text-muted-foreground mb-6">
                    Books you rent out will appear here
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rentedBooks.map((rental) => (
                    <Card key={rental.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex space-x-4">
                          <img
                            src={rental.image}
                            alt={rental.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold line-clamp-1">{rental.title}</h3>
                            <p className="text-sm text-muted-foreground">{rental.author}</p>
                            <p className="text-lg font-bold text-blue-600">${rental.rentalPrice}/week</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Renter:</span>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={rental.renterAvatar} />
                                <AvatarFallback>
                                  <User className="w-3 h-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span>{rental.renter}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Start Date:</span>
                            <span>{new Date(rental.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">End Date:</span>
                            <span>{new Date(rental.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge className={rental.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {rental.status}
                            </Badge>
                          </div>
                        </div>

                        {rental.status === "active" && (
                          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            <Timer className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-800">
                              {rental.daysLeft > 0 ? `${rental.daysLeft} days left` : "Due today"}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                          {rental.status === "active" && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleExtendRental(rental.id)}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Extend
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="space-y-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Save books you're interested in to your wishlist
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/marketplace">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {wishlist.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {!item.available && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                              <Badge className="bg-red-500">Unavailable</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-green-600">${item.price}</span>
                              {item.rentPrice && (
                                <span className="text-sm text-blue-600 ml-2">
                                  Rent: ${item.rentPrice}/week
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1">{item.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Seller: {item.seller}</span>
                            <Badge variant="outline">{item.condition}</Badge>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-amber-600 hover:bg-amber-700"
                              disabled={!item.available}
                              onClick={() => handleAddToCart(item)}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              {item.available ? "Add to Cart" : "Unavailable"}
                            </Button>
                            {item.rentPrice && item.available && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleAddToCart(item)}
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                Rent
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Listing Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          {editingListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingListing.title}
                    onChange={(e) => setEditingListing({...editingListing, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editingListing.author}
                    onChange={(e) => setEditingListing({...editingListing, author: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Sale Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editingListing.price}
                    onChange={(e) => setEditingListing({...editingListing, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="rentPrice">Rent Price ($/week)</Label>
                  <Input
                    id="rentPrice"
                    type="number"
                    step="0.01"
                    value={editingListing.rentPrice}
                    onChange={(e) => setEditingListing({...editingListing, rentPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={editingListing.condition}
                  onValueChange={(value) => setEditingListing({...editingListing, condition: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingListing.description}
                  onChange={(e) => setEditingListing({...editingListing, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label>Upload New Images</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop images here, or click to select
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-amber-600 hover:bg-amber-700">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}