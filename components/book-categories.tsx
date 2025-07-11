import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Heart, Zap, Brain, Rocket, Compass, Crown, Sparkles, Users, Calendar } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    count: "12,450",
    color: "bg-blue-500",
    description: "Novels, short stories, and literary fiction",
  },
  {
    name: "Romance",
    icon: Heart,
    count: "8,920",
    color: "bg-pink-500",
    description: "Love stories and romantic novels",
  },
  {
    name: "Thriller",
    icon: Zap,
    count: "6,780",
    color: "bg-red-500",
    description: "Suspense, mystery, and crime fiction",
  },
  {
    name: "Self-Help",
    icon: Brain,
    count: "5,640",
    color: "bg-green-500",
    description: "Personal development and growth",
  },
  {
    name: "Sci-Fi",
    icon: Rocket,
    count: "4,320",
    color: "bg-purple-500",
    description: "Science fiction and futuristic tales",
  },
  {
    name: "Adventure",
    icon: Compass,
    count: "3,890",
    color: "bg-orange-500",
    description: "Action-packed adventures and journeys",
  },
  {
    name: "Fantasy",
    icon: Crown,
    count: "7,560",
    color: "bg-indigo-500",
    description: "Magic, dragons, and mythical worlds",
  },
  {
    name: "Non-Fiction",
    icon: Sparkles,
    count: "9,230",
    color: "bg-yellow-500",
    description: "Biographies, history, and factual books",
  },
]

export function BookCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our vast collection organized by your favorite genres and topics.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="text-2xl font-bold text-amber-600">{category.count}</div>
                  <div className="text-xs text-muted-foreground">books available</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Special Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Join Reading Groups</h3>
              <p className="text-muted-foreground mb-6">
                Connect with like-minded readers and discover new books through our community groups.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/community">
                  <Users className="w-4 h-4 mr-2" />
                  Explore Groups
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-none">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Rent Books</h3>
              <p className="text-muted-foreground mb-6">
                Try before you buy! Rent books for short-term reading at affordable prices.
              </p>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/rent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Start Renting
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
