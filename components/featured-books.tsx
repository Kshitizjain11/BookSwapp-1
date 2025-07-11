import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart, Calendar } from "lucide-react"
import Link from "next/link"

const featuredBooks = [
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
    badges: ["Bestseller", "Recently Added"],
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
    badges: ["Popular", "Self-Help"],
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: 22.99,
    rentPrice: 5.99,
    rating: 4.7,
    reviews: 987,
    condition: "Very Good",
    image: "/placeholder.svg?height=300&width=200",
    seller: "SciFiFan",
    location: "3.1 miles away",
    isRentable: false,
    badges: ["Classic", "Sci-Fi"],
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    rentPrice: 4.49,
    rating: 4.9,
    reviews: 3421,
    condition: "Like New",
    image: "/placeholder.svg?height=300&width=200",
    seller: "BookwormBella",
    location: "0.9 miles away",
    isRentable: true,
    badges: ["Trending", "Romance"],
  },
]

export function FeaturedBooks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Books Near You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing books from your local community. Buy or rent from trusted sellers nearby.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-0">
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

                  {/* Wishlist Button */}
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
                    <span className="text-xs text-muted-foreground">({book.reviews})</span>
                    <Badge variant="outline" className="text-xs">
                      {book.condition}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">${book.price}</span>
                      {book.isRentable && <span className="text-sm text-blue-600">Rent: ${book.rentPrice}/week</span>}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>Seller: {book.seller}</p>
                      <p>{book.location}</p>
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/marketplace">View All Books</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
