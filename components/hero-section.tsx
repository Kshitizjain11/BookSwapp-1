import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users, Star, TrendingUp, Scan } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">📚 Welcome to BookHub</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Your Ultimate Book Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Buy, sell, and rent books with ease. Connect with fellow book lovers and discover your next great read in
              our vibrant community.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for books, authors, ISBN..."
                className="pl-12 pr-16 h-14 text-lg border-2 border-amber-200 focus:border-amber-500 rounded-full shadow-lg"
              />
              <Button size="sm" className="absolute right-2 top-2 h-10 bg-amber-600 hover:bg-amber-700 rounded-full">
                <Scan className="h-4 w-4 mr-2" />
                Scan
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/marketplace">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Books
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all bg-transparent"
              asChild
            >
              <Link href="/rent">
                <TrendingUp className="w-5 h-5 mr-2" />
                Rent Books
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all bg-transparent"
              asChild
            >
              <Link href="/community">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">50K+</div>
              <div className="text-muted-foreground">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">12K+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">25K+</div>
              <div className="text-muted-foreground">Books Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">4.9</div>
              <div className="text-muted-foreground flex items-center justify-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce">
        <BookOpen className="w-8 h-8 text-amber-600" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-pulse">
        <Users className="w-8 h-8 text-purple-600" />
      </div>
    </section>
  )
}
