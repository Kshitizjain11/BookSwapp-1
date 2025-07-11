import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Heart, Zap, Brain, Rocket, Palette, Globe, Users } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    count: "12,450",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    description: "Novels, short stories, and literary fiction",
  },
  {
    name: "Romance",
    icon: Heart,
    count: "8,230",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
    description: "Love stories and romantic novels",
  },
  {
    name: "Thriller",
    icon: Zap,
    count: "6,780",
    color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    description: "Suspense, mystery, and crime novels",
  },
  {
    name: "Self-Help",
    icon: Brain,
    count: "5,420",
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    description: "Personal development and growth",
  },
  {
    name: "Sci-Fi",
    icon: Rocket,
    count: "4,890",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    description: "Science fiction and fantasy",
  },
  {
    name: "Art & Design",
    icon: Palette,
    count: "3,210",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
    description: "Visual arts, design, and creativity",
  },
  {
    name: "History",
    icon: Globe,
    count: "4,560",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
    description: "Historical events and biographies",
  },
  {
    name: "Biography",
    icon: Users,
    count: "3,890",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300",
    description: "Life stories and memoirs",
  },
]

export function BookCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your next favorite book from our diverse collection of genres and categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <p className="text-xs font-medium text-amber-600">{category.count} books</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/categories">Explore All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
