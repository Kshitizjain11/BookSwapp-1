import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Star, TrendingUp, ShoppingCart, Calendar, MessageCircle, Award } from "lucide-react"

const stats = [
  {
    icon: BookOpen,
    value: "50,230",
    label: "Books Available",
    description: "Across all categories",
    color: "text-blue-600",
  },
  {
    icon: Users,
    value: "12,450",
    label: "Active Users",
    description: "Growing community",
    color: "text-green-600",
  },
  {
    icon: ShoppingCart,
    value: "25,680",
    label: "Books Sold",
    description: "This year",
    color: "text-purple-600",
  },
  {
    icon: Calendar,
    value: "8,920",
    label: "Books Rented",
    description: "Monthly average",
    color: "text-orange-600",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    description: "User satisfaction",
    color: "text-yellow-600",
  },
  {
    icon: MessageCircle,
    value: "15,340",
    label: "Community Posts",
    description: "Active discussions",
    color: "text-pink-600",
  },
  {
    icon: TrendingUp,
    value: "89%",
    label: "Repeat Customers",
    description: "Customer loyalty",
    color: "text-indigo-600",
  },
  {
    icon: Award,
    value: "156",
    label: "Reading Groups",
    description: "Active communities",
    color: "text-red-600",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">BookHub by the Numbers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of book lovers in our thriving marketplace and community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
