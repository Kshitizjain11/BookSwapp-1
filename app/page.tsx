import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedBooks } from "@/components/featured-books"
import { BookCategories } from "@/components/book-categories"
import { RecommendedBooks } from "@/components/recommended-books"
import { CommunitySection } from "@/components/community-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div>Loading featured books...</div>}>
        <FeaturedBooks />
      </Suspense>
      <BookCategories />
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <RecommendedBooks />
      </Suspense>
      <CommunitySection />
    </div>
  )
}
