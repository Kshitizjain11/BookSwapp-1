import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, BookOpen, Star, Trophy } from "lucide-react"
import Link from "next/link"

const communityStats = [
  { label: "Active Members", value: "12,450", icon: Users },
  { label: "Books Shared", value: "50,230", icon: BookOpen },
  { label: "Reviews Written", value: "25,680", icon: Star },
  { label: "Discussions", value: "8,920", icon: MessageCircle },
]

const topMembers = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Book Guru",
    books: 156,
    reviews: 89,
    rating: 4.9,
  },
  {
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Sci-Fi Expert",
    books: 203,
    reviews: 145,
    rating: 4.8,
  },
  {
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Romance Queen",
    books: 98,
    reviews: 67,
    rating: 4.9,
  },
]

const recentDiscussions = [
  {
    title: "Best Fantasy Books of 2024",
    author: "BookLover92",
    replies: 23,
    time: "2 hours ago",
    category: "Fantasy",
  },
  {
    title: "Looking for book recommendations similar to 'Atomic Habits'",
    author: "GrowthMindset",
    replies: 15,
    time: "4 hours ago",
    category: "Self-Help",
  },
  {
    title: "Book club meeting this weekend - discussing 'The Seven Moons'",
    author: "LocalBookClub",
    replies: 8,
    time: "6 hours ago",
    category: "Events",
  },
]

export function CommunitySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Reading Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow book lovers, share recommendations, and discover new perspectives through our vibrant
            community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {communityStats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Top Community Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                Top Community Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-amber-600">#{index + 1}</div>
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{member.name}</h4>
                      <Badge className="bg-amber-100 text-amber-800 text-xs">{member.badge}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{member.books} books</span>
                      <span>{member.reviews} reviews</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {member.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/community/members">View All Members</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-600" />
                Recent Discussions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <div key={index} className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium line-clamp-2 flex-1">{discussion.title}</h4>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {discussion.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>by {discussion.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/community/discussions">Join Discussions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Share your love for books, discover new reads, and connect with like-minded readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/community">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/discussions/new">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Discussion
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
