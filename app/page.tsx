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
      <FeaturedBooks />
      <BookCategories />
      <RecommendedBooks />
      <CommunitySection />
      <StatsSection />
    </div>
  )
}
