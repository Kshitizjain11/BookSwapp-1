"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Flag, Heart, MessageCircle, Plus, Search, Star, TrendingUp, Trophy, Users, ThumbsUp } from "lucide-react"

// -------------------- MOCK DATA --------------------
const discussions = [
  {
    id: 1,
    title: "Best Fantasy Books of 2024 - What are your top picks?",
    author: "BookLover92",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Fantasy",
    replies: 23,
    views: 156,
    likes: 12,
    time: "2 hours ago",
    content: "I've been diving into fantasy this year and found some amazing reads. What are your favorites?",
    tags: ["fantasy", "2024", "recommendations"],
  },
  {
    id: 2,
    title: "Looking for book recommendations similar to 'Atomic Habits'",
    author: "GrowthMindset",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Self-Help",
    replies: 15,
    views: 89,
    likes: 8,
    time: "4 hours ago",
    content: "I loved Atomic Habits and want to read more books about building good habits and productivity.",
    tags: ["self-help", "productivity", "habits"],
  },
  {
    id: 3,
    title: "Book club meeting this weekend - discussing 'The Seven Moons'",
    author: "LocalBookClub",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Events",
    replies: 8,
    views: 45,
    likes: 5,
    time: "6 hours ago",
    content: "Join us this Saturday at 2 PM for our monthly book club discussion!",
    tags: ["book-club", "events", "discussion"],
  },
]

const readingGroups = [
  {
    id: 1,
    name: "Sci-Fi Enthusiasts",
    description: "A group for lovers of science fiction and speculative fiction",
    members: 234,
    image: "/placeholder.svg?height=100&width=100",
    isJoined: false,
    recentActivity: "Discussing 'Dune' by Frank Herbert",
  },
  {
    id: 2,
    name: "Mystery & Thriller Club",
    description: "Unraveling the best mysteries and thrillers together",
    members: 189,
    image: "/placeholder.svg?height=100&width=100",
    isJoined: true,
    recentActivity: "Reading 'Gone Girl' by Gillian Flynn",
  },
  {
    id: 3,
    name: "Non-Fiction Readers",
    description: "Exploring real-world topics through great non-fiction",
    members: 156,
    image: "/placeholder.svg?height=100&width=100",
    isJoined: false,
    recentActivity: "Current read: 'Sapiens' by Yuval Noah Harari",
  },
]

const topMembers = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Book Guru",
    points: 2450,
    books: 156,
    reviews: 89,
    rating: 4.9,
  },
  {
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Sci-Fi Expert",
    points: 2100,
    books: 203,
    reviews: 145,
    rating: 4.8,
  },
  {
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Romance Queen",
    points: 1890,
    books: 98,
    reviews: 67,
    rating: 4.9,
  },
]

const recentReviews = [
  {
    id: 1,
    bookTitle: "The Midnight Library",
    author: "Matt Haig",
    reviewer: "BookwormBella",
    reviewerAvatar: "/placeholder.svg?height=32&width=32",
    rating: 5,
    review:
      "Absolutely beautiful and thought-provoking. This book made me think about life choices in a whole new way.",
    likes: 24,
    time: "1 day ago",
  },
  {
    id: 2,
    bookTitle: "Atomic Habits",
    author: "James Clear",
    reviewer: "ProductivityPro",
    reviewerAvatar: "/placeholder.svg?height=32&width=32",
    rating: 4,
    review:
      "Great practical advice for building better habits. Some concepts were repetitive but overall very helpful.",
    likes: 18,
    time: "2 days ago",
  },
]
// ---------------------------------------------------

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Community</h1>
          <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Connect with fellow book lovers, share recommendations, and join discussions about your favorite reads.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <StatBox value="12,450" label="Members" />
            <StatBox value="8,920" label="Discussions" />
            <StatBox value="25,680" label="Reviews" />
            <StatBox value="156" label="Groups" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs */}
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="discussions">
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Users className="w-4 h-4 mr-2" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="members">
              <Trophy className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="activity">
              <TrendingUp className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* ---------------- Discussions Tab --------------- */}
          <TabsContent value="discussions">
            <DiscussionsTab
              discussions={discussions}
              newPostTitle={newPostTitle}
              newPostContent={newPostContent}
              newPostCategory={newPostCategory}
              setNewPostTitle={setNewPostTitle}
              setNewPostContent={setNewPostContent}
              setNewPostCategory={setNewPostCategory}
            />
          </TabsContent>

          {/* ---------------- Groups Tab --------------- */}
          <TabsContent value="groups">
            <GroupsTab readingGroups={readingGroups} />
          </TabsContent>

          {/* ---------------- Reviews Tab --------------- */}
          <TabsContent value="reviews">
            <ReviewsTab recentReviews={recentReviews} />
          </TabsContent>

          {/* ---------------- Members Tab --------------- */}
          <TabsContent value="members">
            <MembersTab topMembers={topMembers} />
          </TabsContent>

          {/* ---------------- Activity Tab --------------- */}
          <TabsContent value="activity">
            <ActivityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-purple-600">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

/* ---------------- Discussions ---------------- */

interface DiscussionsTabProps {
  discussions: typeof discussions
  newPostTitle: string
  newPostContent: string
  newPostCategory: string
  setNewPostTitle: (v: string) => void
  setNewPostContent: (v: string) => void
  setNewPostCategory: (v: string) => void
}

function DiscussionsTab({
  discussions,
  newPostTitle,
  newPostContent,
  newPostCategory,
  setNewPostTitle,
  setNewPostContent,
  setNewPostCategory,
}: DiscussionsTabProps) {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Posts */}
      <div className="lg:col-span-3 space-y-6">
        <SearchAndFilters />

        {/* Discussion Posts */}
        <div className="space-y-4">
          {discussions.map((d) => (
            <DiscussionCard key={d.id} discussion={d} />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <TrendingTopicsCard />
        <GuidelinesCard />
      </div>
    </div>
  )
}

function SearchAndFilters() {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search discussions..." className="pl-10" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
          <SelectItem value="fantasy">Fantasy</SelectItem>
          <SelectItem value="self-help">Self-Help</SelectItem>
          <SelectItem value="events">Events</SelectItem>
        </SelectContent>
      </Select>
      {/* New Post Button + Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </DialogTrigger>
        <NewPostDialog />
      </Dialog>
    </div>
  )
}

function NewPostDialog() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create New Discussion</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to discuss?"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="self-help">Self-Help</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Content</label>
          <Textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Post Discussion</Button>
        </div>
      </div>
    </DialogContent>
  )
}

function DiscussionCard({ discussion }: { discussion: (typeof discussions)[number] }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
            <AvatarFallback>{discussion.author[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg hover:text-purple-600 cursor-pointer">{discussion.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>by {discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.time}</span>
                  <Badge variant="outline" className="text-xs">
                    {discussion.category}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Flag className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-muted-foreground">{discussion.content}</p>

            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <IconText icon={ThumbsUp} value={discussion.likes} />
                <IconText icon={MessageCircle} value={discussion.replies} />
                <IconText icon={Eye} value={discussion.views} />
              </div>
              <Button variant="outline" size="sm">
                Join Discussion
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function IconText({ icon: Icon, value }: { icon: typeof Eye; value: number }) {
  return (
    <div className="flex items-center">
      <Icon className="w-4 h-4 mr-1" />
      {value}
    </div>
  )
}

/* ---------------- Sidebar Cards ---------------- */

function TrendingTopicsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {[
          { topic: "#fantasy2024", count: "156 posts" },
          { topic: "#bookclub", count: "89 posts" },
          { topic: "#recommendations", count: "234 posts" },
        ].map((t) => (
          <div key={t.topic} className="flex items-center justify-between">
            <span className="text-sm">{t.topic}</span>
            <Badge variant="secondary">{t.count}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function GuidelinesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Community Guidelines</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <p>• Be respectful and kind to all members</p>
        <p>• No spam or self-promotion</p>
        <p>• Use appropriate categories for posts</p>
        <p>• No spoilers without warnings</p>
      </CardContent>
    </Card>
  )
}

/* ---------------- Groups Tab ---------------- */

function GroupsTab({ readingGroups }: { readingGroups: typeof readingGroups }) {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Groups */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reading Groups</h2>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {readingGroups.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </div>
      </div>

      {/* Your Groups Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img src="/placeholder.svg?height=32&width=32" alt="Group" className="w-8 h-8 rounded" />
                <div>
                  <p className="font-medium text-sm">Mystery & Thriller Club</p>
                  <p className="text-xs text-muted-foreground">5 new messages</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function GroupCard({ group }: { group: (typeof readingGroups)[number] }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-16 h-16 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">{group.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <IconText icon={Users} value={group.members} />
            </div>
            <p className="text-sm text-purple-600 mb-4">{group.recentActivity}</p>
            <Button
              variant={group.isJoined ? "outline" : "default"}
              size="sm"
              className={!group.isJoined ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {group.isJoined ? "Joined" : "Join Group"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------- Reviews Tab ---------------- */

function ReviewsTab({ recentReviews }: { recentReviews: typeof recentReviews }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Reviews</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Write Review
        </Button>
      </div>

      <div className="space-y-4">
        {recentReviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof recentReviews)[number] }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={review.reviewerAvatar || "/placeholder.svg"} alt={review.reviewer} />
            <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold">{review.bookTitle}</h3>
                <p className="text-sm text-muted-foreground">by {review.author}</p>
              </div>
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
            </div>

            <p className="text-muted-foreground mb-3">{review.review}</p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>by {review.reviewer}</span>
                <span>•</span>
                <span>{review.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-1" />
                  {review.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------- Members Tab ---------------- */

function MembersTab({ topMembers }: { topMembers: typeof topMembers }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top Community Members</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topMembers.map((m, idx) => (
          <MemberCard key={m.name} member={m} rank={idx + 1} />
        ))}
      </div>
    </div>
  )
}

function MemberCard({ member, rank }: { member: (typeof topMembers)[number]; rank: number }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="relative mb-4">
          <Avatar className="w-20 h-20 mx-auto">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback className="text-lg">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Badge className="absolute -top-2 -right-2 bg-amber-500">#{rank}</Badge>
        </div>

        <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
        <Badge className="bg-purple-100 text-purple-800 mb-3">{member.badge}</Badge>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Points:</span>
            <span className="font-medium text-purple-600">{member.points}</span>
          </div>
          <div className="flex justify-between">
            <span>Books:</span>
            <span>{member.books}</span>
          </div>
          <div className="flex justify-between">
            <span>Reviews:</span>
            <span>{member.reviews}</span>
          </div>
          <div className="flex justify-between">
            <span>Rating:</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {member.rating}
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}

/* ---------------- Activity Tab ---------------- */

function ActivityTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Community Activity</h2>

      <div className="space-y-4">
        {[
          {
            name: "Sarah Johnson",
            avatar: "SJ",
            action: 'posted a new review for "The Midnight Library"',
            time: "2 minutes ago",
          },
          {
            name: "Mike Chen",
            avatar: "MC",
            action: "joined the Sci-Fi Enthusiasts group",
            time: "15 minutes ago",
          },
          {
            name: "Emma Davis",
            avatar: "ED",
            action: 'started a new discussion: "Best Romance Novels of 2024"',
            time: "1 hour ago",
          },
        ].map((a) => (
          <Card key={a.time}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={a.name} />
                  <AvatarFallback>{a.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{a.name}</span> {a.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
