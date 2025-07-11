"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Calendar,
  ShoppingCart,
  Shield,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  User,
  Award,
} from "lucide-react"
import Link from "next/link"

// Mock data for the book
const bookData = {
  id: 1,
  title: "The Midnight Library",
  author: "Matt Haig",
  isbn: "978-0525559474",
  price: 15.99,
  rentPrice: 3.99,
  rating: 4.8,
  reviews: 1234,
  condition: "Like New",
  images: [
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
  ],
  seller: {
    name: "BookLover123",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    totalSales: 156,
    joinDate: "2022",
    location: "2.3 miles away",
    responseTime: "Usually responds within 2 hours",
  },
  description:
    "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
  details: {
    publisher: "Viking",
    publishDate: "August 13, 2020",
    pages: 288,
    language: "English",
    dimensions: "6.4 x 1.1 x 9.5 inches",
    weight: "1.2 pounds",
  },
  category: "Fiction",
  tags: ["Philosophy", "Fantasy", "Contemporary", "Mental Health"],
  isRentable: true,
  availability: "Available",
  shippingOptions: ["Standard Shipping", "Express Shipping", "Local Pickup"],
  returnPolicy: "30-day return policy",
}

const reviews = [
  {
    id: 1,
    user: "ReadingEnthusiast",
    avatar: "/placeholder.svg?height=32&width=32",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely loved this book! The concept is fascinating and the writing is beautiful. Highly recommend!",
    helpful: 12,
  },
  {
    id: 2,
    user: "BookwormBella",
    avatar: "/placeholder.svg?height=32&width=32",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great philosophical read. Makes you think about life choices and possibilities. Well written and engaging.",
    helpful: 8,
  },
]

export default function BookDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedTab, setSelectedTab] = useState("description")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bookData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bookData.images.length) % bookData.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-foreground">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground">{bookData.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img
                src={bookData.images[currentImageIndex] || "/placeholder.svg"}
                alt={bookData.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {bookData.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Wishlist Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Thumbnail Images */}
            {bookData.images.length > 1 && (
              <div className="flex space-x-2">
                {bookData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-28 rounded border-2 overflow-hidden ${
                      index === currentImageIndex ? "border-amber-500" : "border-muted"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${bookData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{bookData.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {bookData.author}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(bookData.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{bookData.rating}</span>
                </div>
                <span className="text-muted-foreground">({bookData.reviews} reviews)</span>
                <Badge variant="outline">{bookData.condition}</Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {bookData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-600">${bookData.price}</span>
                    <Badge className="bg-green-100 text-green-800">{bookData.availability}</Badge>
                  </div>

                  {bookData.isRentable && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-blue-600 font-medium">Rent for ${bookData.rentPrice}/week</span>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Select Dates
                      </Button>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="lg">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Seller
                      </Button>
                      <Button variant="outline" size="lg">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Buyer Protection Guarantee</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 mr-2" />
                      <span>Free shipping on orders over $25</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      <span>{bookData.returnPolicy}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={bookData.seller.avatar || "/placeholder.svg"} alt={bookData.seller.name} />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{bookData.seller.name}</h4>
                      <Badge className="bg-amber-100 text-amber-800">
                        <Award className="w-3 h-3 mr-1" />
                        Trusted Seller
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>
                          {bookData.seller.rating} rating • {bookData.seller.totalSales} sales
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{bookData.seller.location}</span>
                      </div>
                      <p>Member since {bookData.seller.joinDate}</p>
                      <p>{bookData.seller.responseTime}</p>
                    </div>

                    <Button variant="outline" size="sm" className="mt-3 bg-transparent" asChild>
                      <Link href={`/seller/${bookData.seller.name}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({bookData.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{bookData.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold mb-3">Book Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ISBN:</span>
                          <span>{bookData.isbn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Publisher:</span>
                          <span>{bookData.details.publisher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Publish Date:</span>
                          <span>{bookData.details.publishDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pages:</span>
                          <span>{bookData.details.pages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Language:</span>
                          <span>{bookData.details.language}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold mb-3">Physical Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span>{bookData.details.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight:</span>
                          <span>{bookData.details.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Condition:</span>
                          <span>{bookData.condition}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{bookData.rating}</div>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(bookData.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{bookData.reviews} reviews</div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-2">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-semibold">{review.user}</h5>
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
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>

                            <p className="text-muted-foreground mb-3">{review.comment}</p>

                            <div className="flex items-center space-x-4 text-sm">
                              <button className="text-muted-foreground hover:text-foreground">
                                👍 Helpful ({review.helpful})
                              </button>
                              <button className="text-muted-foreground hover:text-foreground">Reply</button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated with related books */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-muted rounded-t-lg"></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Related Book {i}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Author Name</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">$12.99</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">4.5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
