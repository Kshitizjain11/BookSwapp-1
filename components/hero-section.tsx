"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-100">
                <Sparkles className="w-3 h-3 mr-1" />
                New: AI-Powered Recommendations
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Local{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Book Universe
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Buy, sell, and rent books from your community. Connect with fellow book lovers, discover hidden gems,
                and build your personal library.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for books, authors, ISBN..."
                className="pl-12 pr-4 h-14 text-lg border-2 focus:border-amber-500"
              />
              <Button className="absolute right-2 top-2 h-10 bg-amber-600 hover:bg-amber-700">Search</Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/marketplace">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Books
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/sell">Sell Your Books</Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/map">
                  <MapPin className="w-5 h-5 mr-2" />
                  Local Map
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">50K+</div>
                <div className="text-sm text-muted-foreground">Books Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">12K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Featured Book"
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">The Great Gatsby</h3>
                <p className="text-muted-foreground">F. Scott Fitzgerald</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">$12.99</span>
                  <Badge className="bg-blue-100 text-blue-800">For Rent</Badge>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-amber-100 dark:bg-amber-900 rounded-full p-4 shadow-lg animate-bounce">
              <Users className="w-6 h-6 text-amber-600" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-green-100 dark:bg-green-900 rounded-full p-4 shadow-lg animate-pulse">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
