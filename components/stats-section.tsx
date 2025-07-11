import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Star, MapPin } from "lucide-react"

const stats = [
  {
    icon: BookOpen,
    value: "50,000+",
    label: "Books Available",
    description: "From classics to latest releases",
  },
  {
    icon: Users,
    value: "12,000+",
    label: "Active Users",
    description: "Growing community of book lovers",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "Trusted by our community",
  },
  {
    icon: MapPin,
    value: "500+",
    label: "Cities Covered",
    description: "Local marketplace everywhere",
  },
]

export function StatsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 mx-auto mb-3 text-amber-600" />
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
